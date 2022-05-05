import { find, update } from '../util/db';

const statusPageCollection: string = 'statuspages';

async function run(): void {
    // Get all statuspages with cert and private key set to the custom domain
    const statusPages: $TSFixMe = await find(statusPageCollection, {
        'domains.cert': { $type: 'string' },
        'domains.privateKey': { $type: 'string' },
        'domains.enableHttps': { $exists: false },
    });

    for (const statusPage of statusPages) {
        const domains: $TSFixMe = statusPage.domains.map(
            (eachDomain: $TSFixMe) => {
                if (eachDomain.cert && eachDomain.privateKey) {
                    eachDomain.enableHttps = true;
                }
                return eachDomain;
            }
        );
        await update(
            statusPageCollection,
            { _id: statusPage._id },
            { domains }
        );
    }

    return `Script ran for ${statusPages.length} status pages`;
}

export default run;