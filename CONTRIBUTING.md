# Contributing to Amazing Interview Prep

## Report a problem

Search existing issues first. For a session bug, include the track, level, browser, steps to reproduce, and what you expected to happen. For a question correction, include the question title and a counterexample that shows why the prompt or rubric needs to change. Use fictional answers in screenshots and examples.

## Contribute an interview question

The question bank lives in `public/bank.mjs`. For discussion rounds, write an opening question, a follow-up that challenges the answer, and criteria an interviewer can observe. For practical cases, provide enough constraints for a candidate to attempt the exercise in 20 minutes. Use original wording and cite any public inspiration in the PR. Keep confidential interview material out of submissions.

## Submit and verify a change

Branch from `dev` and open your pull request against `dev`. Use Node.js 24 and run:

```sh
npm ci
npm run check
npm run dev
```

For UI changes, try a session in a narrow viewport, navigate with the keyboard, write a sample note, and resume it after a reload. In the PR, describe the change and what you verified. Maintainers promote reviewed changes through staging. Deployment details are in the [README](README.md#changes-and-releases).
