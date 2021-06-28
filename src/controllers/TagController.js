const Tag = require("../models/Tag");
const User = require("../models/User");

class TagController {
  async index(req, res) {
    const tags = await Tag.find({ user: req.userId });

    const findUser = await User.findById(req.userId);
    const repositories = findUser.repositories || []

    const starredRepos = repositories.map((e) => {
      const findTag = tags.find((t) => t.repository === String(e.id));

      return {
        ...e,
        tags: findTag ? findTag.tags || [] : [],
      }
    })

    return res.json(starredRepos);
  }

  async store(req, res) {
    const { repository } = req.body;
    await Tag.updateOne({
      repository,
      user: req.userId,
    }, {
      ...req.body,
      user: req.userId,
    }, {
      upsert: true,
    });

    const tag = await Tag.findOne({ user: req.userId, repository })

    return res.json(tag);
  }

  async destroy(req, res) {
    await Tag.findByIdAndDelete(req.params.id);

    return res.send();
  }
}

module.exports = new TagController();
