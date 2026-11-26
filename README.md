# WASM clients built by CI

Built with Nix from moosylog/glide4rmk@0637358f004ce9e9a36d219cc120e994213b7cf9 by the deploy on master.
WASM_KEY is `node scripts/wasm-key.mjs` of that commit: the hash of flake.nix,
flake.lock and nix/. `scripts/setup-session.sh` copies these into src/vendor/
and warns when WASM_KEY differs from the checkout's own. Force-pushed, one commit.
