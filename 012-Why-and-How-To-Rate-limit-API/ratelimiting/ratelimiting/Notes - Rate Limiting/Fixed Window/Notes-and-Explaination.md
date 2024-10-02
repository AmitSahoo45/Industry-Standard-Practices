# Fixed window

- Fixed Window Rate Limiting is a simple algorithm that allows a certain number of requests during a fixed window of time.
- Everyone has request counter that is reset every few moments. If the counter exceeds the allowed quota, the request is rejected.
- Its main drawback is that it cannot handle burst traffic at all. Imagine you have a quota of 100 requests per minute. When the counters reset for everyone, potentially all your users can send 100 requests all at once.
- I can also be very rigid. If the window is too long, users may have to wait a long time before being able to send requests again. If the window is too short, the benefits of rate limiting are reduced.