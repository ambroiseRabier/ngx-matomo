# NgxMatomo

Lib generated with [https://angular.io/guide/creating-libraries][https://angular.io/guide/creating-libraries].
This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0.

## Test, Build

```shell script
npm run test-lib
npm run build-lib
```

## Publishing

Pusblishing is done by tag on master branch by Travis, `src/projects/ngx-matomo/package.json` version had to be changed manually though 
(don't use `npm version` as it modify the wrong package.json). Make a commit and tag it by using version number.

```diff
modified:   projects/ngx-matomo/package.json
```

```shell script
git tag -l
git commit -am"1.0.0"
git tag v1.0.0
git push && git push --tags
```

## Code scaffolding

Run `ng generate component component-name --project NgxMatomo` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project NgxMatomo`.
> Note: Don't forget to add `--project NgxMatomo` or else it will be added to the default project in your `angular.json` file. 
