# Hyperlane relayer

Following these instructions to run the Hyperlane relayer

1. clone the repository `https://github.com/hyperlane-xyz/hyperlane-monorepo/tree/main`

2. create a new branch and apply the fix for the Hyperlane relayer by cherry picking the relevant commit:

```
git fetch
git pull
gco -b my-local-relayer
git cherry-pick 871df7a
```

3. install the dependencies and build the relayer

```
yarn install && yarn build
```

4. Setup the relayer key (make sure this key has funds on both networks it is listening to)

```
export HYP_KEY='<YOUR_PRIVATE_KEY>'
```

5. Run the relayer with these parameters

```
yarn workspace @hyperlane-xyz/cli hyperlane relayer \
    --chains sepolia,sapphiretestnet \
    --key 0x<your-relayer-private-key> \
    --verbosity debug
```
