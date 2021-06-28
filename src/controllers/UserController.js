const User = require("../models/User");
const { checkUserExistGithub, getStarredRepositories } = require("../client/github");

class UserController {
  async checkUser(req, res) {
    const { username } = req.body;

    const gbUser = await checkUserExistGithub(username);

    if (!gbUser.id) {
      return res.json({
        error: "Usuario nao existe no Github",
      });
    }

    const user = await User.findOne({
      username,
    });

    let newAccount = true;
    if (user) {
      newAccount = false
    }

    return res.json({
      newAccount,
      success: true,
    });
  }

  async store(req, res) {
    const { username } = req.body;

    if (
      await User.findOne({
        username,
      })
    ) {
      return res.status(400).json({
        error: "Usuario ja existe",
      });
    }

    let repositories = []
    let etag = ""
    const ghRepo = await getStarredRepositories(username, "");
    if (ghRepo.data) {
      repositories = ghRepo.data
      etag = ghRepo.headers.etag
    }

    const user = await User.create({
      ...req.body,
      repositories,
      etag,
    });

    return res.json({
      user,
      token: User.generateToken(user),
    });
  }
}

module.exports = new UserController();
