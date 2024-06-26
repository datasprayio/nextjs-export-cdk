_This repo has been forked from [cdk-nextjs-export-s3-dynamic-routing](https://github.com/dkershner6/cdk-nextjs-export-s3-dynamic-routing) mainly to re-publish it for Java_

---

# Next.js Static Export S3 Site with Dynamic Routing

[NPM](https://www.npmjs.com/package/nextjs-export-cdk)

[![View on Construct Hub](https://constructs.dev/badge?package=nextjs-export-cdk)](https://constructs.dev/packages/nextjs-export-cdk)

_Have a more complex use case for Next.js 13? Perhaps check out [open-next-cdk](https://constructs.dev/packages/open-next-cdk)._

Deploy a static export Next.js site to Cloudfront and S3 while maintaining the ability to use dynamic routes.

This effectively takes all of the benefits of Next.js, including routing, code-splitting, static HTML exporting, and also gives you the benefits of a SPA (single page application). This will be mostly useful for client-generated pages, but you can also partially server side generate some data should you choose.

This may also be useful if you use Next.js SSR in other frontends, and just want to keep a consistent experience for your developers.

## Getting Started

You can use this construct effectively with no props, but here is a minimal example with a custom domain:

```ts
export class MyStaticSiteStack extends cdk.Stack {
    private readonly hostedZone: route53.IHostedZone;
    private readonly customDomainName: string;
    private readonly site: NextjsExportS3DynamicRoutingSite;

    constructor(scope: sst.App, id: string, props?: sst.StackProps) {
        super(scope, id, props);

        this.hostedZone = this.findHostedZone();
        this.customDomainName = "yourdomain.com";

        this.site = this.createNextJsSite();
        this.createDnsRecord();
    }

    private findHostedZone(): route53.IHostedZone {
        return route53.HostedZone.fromLookup(this, "HostedZone", {
            domainName: this.customDomainName,
        });
    }

    private createNextJsSite(): NextjsExportS3DynamicRoutingSite {
        const certificate = new acm.Certificate(
            this,
            "Certificate",
            {
                domainName: this.customDomainName,
                validation: acm.CertificateValidation.fromDns(this.hostedZone),
            }
        );

        return new NextjsExportS3DynamicRoutingSite(this, "NextJsSite", {
            distributionProps: {
                certificate,
                domainNames: [this.customDomainName],
            }
        });
    }

    private createDnsRecord = (): route53.ARecord => {
        return new route53.ARecord(this, `AliasRecord`, {
            recordName: this.customDomainName,
            target: route53.RecordTarget.fromAlias(
                new r53Targets.CloudFrontTarget(
                    this.site.cloudfrontDistribution
                )
            ),
            zone: this.hostedZone,
        });
    };
}
```

There are no outside requirements for this construct, and it will delete all of its resources when the stack is deleted.
