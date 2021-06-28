const User = require("../models/User");
const { getStarredRepositories } = require("../client/github")

class SessionController {
  async store(req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({
      username,
    });

    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    if (!(await user.compareHash(password))) {
      return res.status(400).json({
        error: "Invalid password",
      });
    }

    const etag = String(user ? user.etag || "" : "")

    const repositories = await getStarredRepositories(username, etag);
    if (repositories.data) {
      user.repositories = repositories.data
      if (repositories.headers) {
        user.etag = repositories.headers.etag
      }
      await user.save()
    }

    return res.json({
      user,
      token: User.generateToken(user),
    });
  }
}

module.exports = new SessionController();
