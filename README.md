# QuickConverter

## Introduction

This Currency Converter is a web application that allows users to easily convert amounts between different currencies.

## Technologies

- Zod
- Axios
- React
- Shadcn-ui
- TypeScript
- Tailwind CSS
- TanStack Query

## Notes

### Chart Data and Mock Numbers

In the current version of the QuickConverter, the chart showcasing historical exchange rates is populated with mock numbers. This decision was made because accessing real-time and historical exchange data requires a subscription to the PRO version of the exchange rate currency api.

## Live Application

Experience QuickConverter live: [Visit QuickConverter](https://quick-converter-nu.vercel.app/)

Click the link above to access the application and enjoy currency conversions.

## Getting Started

To run the Currency Converter on your machine, follow these quick steps:

1. Obtain an API key by signing up at [ExchangeRate-API](https://www.exchangerate-api.com).
2. Create a `.env` file in the root of your project and add your API key as follows:

    ```
    VITE_API_KEY="your_api_key_here"
    ```

    Replace `your_api_key_here` with the API key you obtained.

3. Run `npm i` to install the project dependencies.

That's it! You're now ready to use the QuickConverter.
