export const databaseTryCatch =
  (code, response1, response2, controller) => async (req, res) => {
    try {
      await controller(req, res)
    } catch (e) {
      if (e.code === code) {
        throw new Error(response1)
      } else {
        throw new Error(response2)
      }
    }
  }
