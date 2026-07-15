<div align="center">

<img src="./interface/public/logo.svg" alt="Arafi Logo" width="120" />

# Arafi

### Web3 Payment Logic as a Service (PLaaS)

**The frictionless blockchain payment middleware connecting Web3 checkouts directly to local fiat bank accounts.**

[Documentation](https://arafi.yourara.com/docs) · [API Reference](https://arafi.yourara.com/docs) · [Dashboard](https://arafi.yourara.com) · [Interactive Demo Store](https://arafi-nextjs-demo.vercel.app)

</div>

---

<!-- ## 👨‍⚖️ HACKATHON JUDGE DEMO CREDENTIALS

To access the Arafi Dashboard and test the application, log in with the following global demo credentials:

* **Email**: `judge@nomba.com`
* **Password**: `nomba2026`

Use these credentials to log in at [https://arafi.yourara.com/login](https://arafi.yourara.com/login)

### 🏪 Interactive Web3 Demo Store Sandbox
Test the developer checkout integration live on our Demo Store:
👉 **[Arafi Web3 Demo Store](https://arafi-nextjs-demo.vercel.app)**

--- -->

## The Problem with Crypto Payments Today

Accepting crypto payments natively should be simple, but operationally it is filled with developer friction:

- **The Asset Fragmentation Barrier**: Forcing a user to manually swap their holdings (like XLM or BTC) to the merchant's preferred stablecoin (like USDC) ruins checkout conversion.
- **The Trustline Headache**: On networks like Stellar, a user's wallet cannot receive a digital token unless they have manually established a "trustline" first.
- **The Liquidity Off-ramp Chasm**: Merchants in emerging markets do not want to hold volatile crypto or stablecoins. They need local currency (NGN) in their local bank accounts, but building a custom stablecoin-to-fiat auto-liquidation pipeline is incredibly complex.
- **The Webhook Void**: Blockchain events happen out-of-band on public ledgers. Connecting those transactions back to your app's database state usually requires building brittle, custom blockchain indexers.

**Arafi abstracts this entire pipeline into a single API call.**

---

## What Arafi Is

Arafi is a **Payment Logic as a Service (PLaaS)** platform built for Web3. You bring the public keys; Arafi manages the smart contracts, the multi-asset path-payment routing, and the automated local fiat off-ramp settlement rails.

You call our API to request a checkout. Arafi handles the on-chain logic, converts the assets, processes the fiat cash-out, and updates your app database[cite: 2].

---

## What You Can Build with Arafi

### 🛒 One-Time Checkouts (Any Token In $\rightarrow$ Stablecoin Out)
Generate a Web3 checkout payload in seconds. Your customers can pay with whatever assets they hold in their wallets. Arafi utilizes **Stellar's Native Path Payments** to automatically find the best conversion path on the Decentralized Exchange (DEX), execute the atomic swap, and deliver exact stablecoin balances to the target address in under 5 seconds.

```bash
# Create a Web3 checkout intent
POST /v1/checkouts
{
  "amountUsdc": 10.00,
  "developerWallet": "G...",
  "redirectUrl": "https://..."
}