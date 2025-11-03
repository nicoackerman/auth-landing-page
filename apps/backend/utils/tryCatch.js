import boom from "@hapi/boom";

// Main wrapper for async function
export async function tryCatchAsync(promise) {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}

// Main wrapper for async function
export async function safeExec(
  promise,
  boomError = boom.internal("Internal error in transaction"),
  rollback = []
) {
  const { data, error } = await tryCatchAsync(promise);
  console.log(data, error);
  if (error) {
    for (const action of rollback) {
      await tryCatchAsync(action());
    }
    console.log(data, error);

    return { data: null, error: error.isBoom ? error : boomError };
  }
  console.log(data, error);
  return { data, error: null };
}

// Main wrapper for sync function
export function tryCatchSync(callback) {
  try {
    const data = callback();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
}
