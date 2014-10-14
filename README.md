Slackbot Bender [![Build Status](https://travis-ci.org/felixrieseberg/SlackbotBender.svg?branch=master)](https://travis-ci.org/felixrieseberg/SlackbotBender)
==============
This is a simple, but easily extendable bot for the great chat app [Slack](http://www.slack.com).

## Overview
`/bot/index.js` Captures post request and looks for a request leading with `Bender:`. It takes
everything to the right of that request and uses triggers defined in `/bot/triggers.js` to
figure out which method should deal with the request.

Each integration has its own module found in `integrations`. A good example integration to look at
is the WolframAlpha integration, since it`s a bit more interesting than the immediate return
of a string.

## Current Integrations
- Debug Info
- Yahoo Finance
- Bender Quotes
- Help
- Fortunes
- Text Messaging (using Twilio)
- Yelling (repeats text in fancy ASCII art)
- Timezones (using Wolfram Alpha)
- Memes (experimental)
- Wolfram Alpha (experimental)

## License
The MIT License (MIT)

Copyright (c) 2014 Felix Rieseberg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
