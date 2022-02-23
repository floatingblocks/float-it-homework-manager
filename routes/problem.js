"use strict";

const express = require('express');
const md = require('markdown-it')();
const router = express.Router();

const config = require("../lib/config").getConfig();
const userManager = require("../lib/users")

/* GET problem listing. */
router.get(/(\d+)/, async function(req, res, next) {
  if (!req.session.uid || await userManager.getUser(req.session.uid) === null) {
    res.redirect("/login");
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
        userName: "Float"
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
