import { useState } from "react";

export default function URLShortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const shortenUrl = async () => {
    console.log("Button clicked");

    if (!originalUrl) {
      setError("Please enter a URL");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Make a request to your backend API
      const response = await fetch("http://localhost:8080/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: originalUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to shorten URL");
      }

      const data = await response.json();
      if (data && data.shortUrl) {
        setShortUrl(data.shortUrl);
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to shorten URL. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-600">
          URL Shortener
        </h1>

        <div className="mb-4">
          <label
            htmlFor="url-input"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Enter your long URL
          </label>
          <input
            id="url-input"
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="https://example.com/very/long/url/that/needs/shortening"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          onClick={shortenUrl}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
        >
          {isLoading ? "Shortening..." : "Shorten URL"}
        </button>

        {error && <p className="mt-2 text-red-600 text-sm">{error}</p>}

        {shortUrl && (
          <div className="mt-6 p-3 bg-gray-50 rounded-md">
            <p className="text-sm font-medium text-gray-700 mb-1">
              Your shortened URL:
            </p>
            <div className="flex space-x-2">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="flex-grow p-2 border border-gray-300 rounded-md bg-white"
              />
              <button
                onClick={copyToClipboard}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 rounded-md border border-gray-300"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-md flex items-center justify-center"
              >
                Go to
              </a>
            </div>
          </div>
        )}

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Create short, memorable links in seconds</p>
        </div>
      </div>
    </div>
  );
}
