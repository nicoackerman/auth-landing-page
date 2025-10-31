import boom from "@hapi/boom";
import { RolesRepository } from "../repositories/roles-repository.js";
import { UsersRepository } from "../repositories/users-repository.js";
import { HashingService } from "../services/hashing-service.js";
import { TokensService } from "../services/tokens-service.js";
import { RefreshTokensRepository } from "../repositories/refresh-tokens-repository.js";
import { safeExec } from "../utils/tryCatch.js";

export class AuthController {
  static async login(req, res, next) {
    const { email, password } = req.body;

    // Verifies if user is in db
    const { data: user, error: userError } = await safeExec(
      UsersRepository.getByEmail(email),
      next(boom.unauthorized("Invalid email or password"))
    );
    if (user) return next(userError);

    const {
      username,
      password: hashedPassword,
      id: userId,
      role_id: roleId,
    } = user;

    // Gets the user's role
    const { data: userRole, error: userRoleError } = await safeExec(
      RolesRepository.getById(roleId),
      next(boom.unauthorized("Invalid email or password"))
    );
    if (userRole) return next(userRoleError);

    // Verifies auth credentials (password)
    const { data: isUser, error: isUserError } = await safeExec(
      HashingService.compareWithHash(password, hashedPassword),
      next(boom.unauthorized("Invalid email or password"))
    );

    if (isUser == null) return next(isUserError);
    if (!isUser) return next(boom.unauthorized("Invalid email or password"));

    // Generates auth tokens
    const { data: tokensData, error: tokensError } = await safeExec(
      TokensService.generateForAuth(username, userId, email),
      next(boom.internal("Invalid email or password"))
    );
    if (tokensError) return next(boom.internal("Invalid email or password"));

    const {
      rtExpiresAt,
      atExpiresAt,
      refreshToken,
      hashedRefreshTk,
      accessToken,
    } = tokensData;

    // Updates auth tokens registered in db
    const { data: rtid, error: rtidError } = await safeExec(
      RefreshTokensRepository.insert(user.id, hashedRefreshTk, rtExpiresAt),
      next(boom.internal("Invalid email or password"))
    );
    if (tokensError) return next(boom.internal("Invalid email or password"));

    res
      .cookie("refresh_token", refreshToken, {
        maxAge: rtExpiresAt,
        httpOnly: true,
        // secure: true,
        // sameSite: "strict",
      })
      .cookie("access_token", accessToken, {
        maxAge: atExpiresAt,
        httpOnly: false,
        // secure: true,
        // sameSite: "strict",
      })
      .json({
        id: user.id,
        email,
        username,
        role: userRole,
      });
  }

  static async signup(req, res, next) {
    const { email, password, username } = req.body;

    // Hash user's password
    const { data: hashedPassword, error: hashError } = await safeExec(
      HashingService.hashString(password),
      boom.badRequest("Error hashing password")
    );
    if (hashError) return next(hashError);

    // Gets the corresponding id for client user's
    const { data: clientRoleId, error: roleError } = await safeExec(
      RolesRepository.getByName("client"),
      boom.internal("Error retrieving client role")
    );
    if (roleError) return next(roleError);

    // Adds the user to db
    const { data: userId, error: createError } = await safeExec(
      UsersRepository.create(username, email, hashedPassword, clientRoleId),
      boom.internal("Error creating user")
    );
    if (createError) return next(createError);

    // Generates auth tokens (for client verification)
    const { data: tokensData, error: tokenError } = await safeExec(
      TokensService.generateForAuth(username, userId, email),
      boom.internal("Error generating tokens"),
      [() => UsersRepository.delete(userId)]
    );
    if (tokenError) return next(tokenError);

    // Updates auth tokens registered in db
    const { error: rtidError } = await safeExec(
      RefreshTokensRepository.insert(
        userId,
        tokensData.hashedRefreshTk,
        tokensData.rtExpiresAt
      ),
      boom.internal("Error saving refresh token"),
      [() => UsersRepository.delete(userId)]
    );
    if (rtidError) return next(rtidError);

    res
      .cookie("refresh_token", tokensData.refreshToken, {
        maxAge: tokensData.rtExpiresAt,
        httpOnly: true,
        // secure: true,
        // sameSite: "strict",
      })
      .cookie("access_token", tokensData.accessToken, {
        maxAge: tokensData.atExpiresAt,
        httpOnly: false,
        // secure: true,
        // sameSite: "strict",
      })
      .json({ id: userId, email, username, role: "client" });
  }

  static async refresh(req, res, next) {
    const decoded = jwt.decode(req.cookies.refresh_token);
    const { username, userId, email } = decoded;
    const {
      rtExpiresAt,
      atExpiresAt,
      refreshToken,
      hashedRefreshTk,
      accessToken,
    } = await TokensService.generateForAuth(username, userId, email);

    const isValid = await RefreshTokensRepository.isValid(
      req.cookies.refresh_token
    );
    if (!isValid) {
      return next(boom.unauthorized(`Refresh Token is invalid`));
    }

    const rtid = await RefreshTokensRepository.insert(
      userId,
      hashedRefreshTk,
      rtExpiresAt
    );
    res
      .cookie("refresh_token", refreshToken, {
        maxAge: rtExpiresAt,
        httpOnly: true,
        // secure: true,
        // sameSite: "strict",
      })
      .cookie("access_token", accessToken, {
        maxAge: atExpiresAt,
        httpOnly: false,
        // secure: true,
        // sameSite: "strict",
      })
      .json({ id: userId, email, username, role: "client" });
  }
}
