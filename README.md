# Vendor XREF UI
A UI for uploading Vendor XREF files, coded in React.

## Getting Started

Download or clone the repo, and cd into the root directory. In your terminal, run the following to:

1. Install project dependencies
```
$ npm install
```

2. Create a `.env` file in the root directory and put the following code in it:
```
config='{"SSO_URL":"https://sso.login.run-np.homedepot.com","SSO_CLIENT_ID":"Get-the-correct-client-id","FLOW_PATH_URL":"https://supplychainnetworkflowpath-q2.apps-np.homedepot.com/directFulfillment/vendorSKUNetwork"}'
```
Be sure to get the client id from PCF for the thd-sso service and replace it above.

3. Start the development server
```
$ npm run dev
```

Your OS' default should launch at: `http://localhost.homedepot.com:4201`
 
## Testing

Run the following command
```
$ npm test
```
in your terminal to start Jest testing framework.
It will output an xml file with the test resutls in the following path: `./src/test/test_results.xml`

## Deployment

To deploy to PCF:

#### For Production

*Place the client ids for the production thd-sso service in Zone A and Zone B in the appropriate place as environment variables in the `prod-za.manfiest.yml` file and the `prod-zb.manifest.yml` file.*

Then run:
```
$ cf push -f manifest.yml
```
