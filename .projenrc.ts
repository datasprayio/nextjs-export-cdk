import { awscdk } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  majorVersion: 0,
  author: 'Dataspray',
  authorAddress: 'matus@matus.io',
  cdkVersion: '2.134.0',
  defaultReleaseBranch: 'main',
  jsiiVersion: '~5.0.0',
  name: 'nextjs-export-cdk',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/datasprayio/nextjs-export-cdk',

  deps: ['lodash.set', 'uglify-js'], /* Runtime dependencies of this module. */
  description: 'Deploy a static export Next.js site to Cloudfront and S3 while maintaining the ability to use dynamic routes.', /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: ['@types/lodash.set', '@types/uglify-js'], /* Build dependencies for this module. */
  packageName: 'nextjs-export-cdk', /* The "name" in package.json. */
  bundledDeps: ['lodash.set', 'uglify-js'], /* Bundled dependencies of this module. */

  publishToMaven: {
    javaPackage: 'io.dataspray.nextexportcdk',
    mavenGroupId: 'io.dataspray',
    mavenArtifactId: 'next-export-cdk',
    mavenEndpoint: 'https://s01.oss.sonatype.org',
  },

  gitignore: ['.DS_Store'],
});
project.synth();
