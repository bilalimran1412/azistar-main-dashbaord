const dns = require('dns');
const { promisify } = require('util');
const axios = require('axios');

const resolveDns = promisify(dns.resolve);

async function getDomainInfo(url) {
    try {
        // Extract base domain from URL
        const urlObj = new URL(url);
        const domain = urlObj.hostname;

        // Get DNS records
        const results = {
            domain,
            subdomains: [],
            relatedDomains: []
        };

        // Get A records (IPv4 addresses)
        try {
            const aRecords = await resolveDns(domain, 'A');
            results.ipAddresses = aRecords;
        } catch (err) {
            console.log('No A records found');
        }

        // Get MX records
        try {
            const mxRecords = await resolveDns(domain, 'MX');
            results.mailServers = mxRecords.map(record => record.exchange);
        } catch (err) {
            console.log('No MX records found');
        }

        // Get NS records (nameservers)
        try {
            const nsRecords = await resolveDns(domain, 'NS'); 
            results.nameservers = nsRecords;
        } catch (err) {
            console.log('No NS records found');
        }

        // Try to discover subdomains using common patterns
        const commonSubdomains = ['www', 'mail', 'ftp', 'blog', 'shop', 'api', 'dev'];
        for (const sub of commonSubdomains) {
            try {
                const subdomain = `${sub}.${domain}`;
                await resolveDns(subdomain, 'A');
                results.subdomains.push(subdomain);
            } catch (err) {
                // Subdomain doesn't exist
                continue;
            }
        }

        // Try to find related domains using same IP
        if (results.ipAddresses && results.ipAddresses.length > 0) {
            try {
                const response = await axios.get(`https://api.hackertarget.com/reverseiplookup/?q=${results.ipAddresses[0]}`);
                if (response.data) {
                    const domains = response.data.split('\n').filter(d => d && !d.includes(domain));
                    results.relatedDomains = domains;
                }
            } catch (err) {
                console.log('Error finding related domains');
            }
        }

        return results;

    } catch (err) {
        console.error('Error getting domain info:', err);
        throw err;
    }
}

module.exports = getDomainInfo;
