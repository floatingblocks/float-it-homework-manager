"use strict";

const express = require('express');
const md = require('markdown-it')();
const router = express.Router();

const config = require("../lib/config").getConfig();
const userManager = require("../lib/users")

/* GET problem listing. */
router.get(/(\d+)/, async function(req, res, next) {
  let user;
  if (!req.session.uid) {
    res.redirect("/login");
    return;
  } else {
    user = await userManager.getUser(req.session.uid);
    if (user === null) {
      res.redirect("/login");
      return;
    }
  }
  const pid = req.params[0];

  const testMD = `
# 测试用的问题

欢迎来到这个测试问题, 我正在用 Markdown来写它, 并且使用 markdown-it 转换。

`
  const problemHTML = md.render(testMD);

  res.render('problem', {
    config: config,
    page: {
        title: "题目-" + pid,
        userName: user.loginName
    },
    problem: {
      pid: pid,
      content: problemHTML,
      submitted: false,
      submittedPersonNumber: 111
    }
  });
});

router.post('/',);
module.exports = router;
