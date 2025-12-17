#!/usr/bin/env node

/**
 * Script tự động generate code cho các IDAS components
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, '../src/app/shared/components');

// Mapping component name to ng-zorro properties
const componentConfigs = {
  'idas-alert': {
    inputs: ['type', 'closeable', 'showIcon', 'message', 'description', 'banner'],
    outputs: ['close'],
    template: `<nz-alert
  [nzType]="type"
  [nzCloseable]="closeable"
  [nzShowIcon]="showIcon"
  [nzMessage]="message"
  [nzDescription]="description"
  [nzBanner]="banner"
  (nzOnClose)="onClose()">
</nz-alert>`
  },
  'idas-anchor': {
    inputs: ['affix', 'bounds', 'offsetTop', 'showInkInFixed', 'targetOffset'],
    outputs: ['click', 'scroll'],
    template: `<nz-anchor
  [nzAffix]="affix"
  [nzBounds]="bounds"
  [nzOffsetTop]="offsetTop"
  [nzShowInkInFixed]="showInkInFixed"
  [nzTargetOffset]="targetOffset"
  (nzClick)="onClick($event)"
  (nzScroll)="onScroll($event)">
  <ng-content></ng-content>
</nz-anchor>`
  },
  'idas-avatar': {
    inputs: ['icon', 'shape', 'size', 'src', 'srcSet', 'alt', 'text'],
    outputs: ['error'],
    template: `<nz-avatar
  [nzIcon]="icon"
  [nzShape]="shape"
  [nzSize]="size"
  [nzSrc]="src"
  [nzSrcSet]="srcSet"
  [nzAlt]="alt"
  [nzText]="text"
  (nzError)="onError($event)">
</nz-avatar>`
  },
  'idas-back-top': {
    inputs: ['template', 'visibilityHeight', 'target', 'duration'],
    outputs: ['click'],
    template: `<nz-back-top
  [nzTemplate]="template"
  [nzVisibilityHeight]="visibilityHeight"
  [nzTarget]="target"
  [nzDuration]="duration"
  (nzClick)="onClick($event)">
  <ng-content></ng-content>
</nz-back-top>`
  },
  'idas-badge': {
    inputs: ['count', 'dot', 'showZero', 'overflowCount', 'color', 'text', 'title', 'offset', 'status'],
    outputs: [],
    template: `<nz-badge
  [nzCount]="count"
  [nzDot]="dot"
  [nzShowZero]="showZero"
  [nzOverflowCount]="overflowCount"
  [nzColor]="color"
  [nzText]="text"
  [nzTitle]="title"
  [nzOffset]="offset"
  [nzStatus]="status">
  <ng-content></ng-content>
</nz-badge>`
  },
  'idas-breadcrumb': {
    inputs: ['autoGenerate', 'separator', 'routeLabel', 'routeLabelFn'],
    outputs: [],
    template: `<nz-breadcrumb
  [nzAutoGenerate]="autoGenerate"
  [nzSeparator]="separator"
  [nzRouteLabel]="routeLabel"
  [nzRouteLabelFn]="routeLabelFn">
  <ng-content></ng-content>
</nz-breadcrumb>`
  },
  'idas-button': {
    inputs: ['type', 'shape', 'size', 'loading', 'disabled', 'block', 'danger', 'ghost'],
    outputs: [],
    template: `<button
  nz-button
  [nzType]="type"
  [nzShape]="shape"
  [nzSize]="size"
  [nzLoading]="loading"
  [disabled]="disabled"
  [nzBlock]="block"
  [nzDanger]="danger"
  [nzGhost]="ghost">
  <ng-content></ng-content>
</button>`
  }
};

// Generate TypeScript code
function generateTS(componentName, config) {
  const inputs = config.inputs.map(input => `  @Input() ${input}?: any;`).join('\n');
  const outputs = config.outputs.map(output => {
    const methodName = `on${output.charAt(0).toUpperCase()}${output.slice(1)}`;
    return `  @Output() readonly ${output} = new EventEmitter<any>();\n\n  ${methodName}(event?: any): void {\n    this.${output}.emit(event);\n  }`;
  }).join('\n\n');

  return `${inputs}${outputs ? '\n\n' + outputs : ''}`;
}

// Process each component
Object.entries(componentConfigs).forEach(([componentName, config]) => {
  const componentPath = path.join(componentsDir, componentName);
  
  if (!fs.existsSync(componentPath)) {
    console.log(`Skipping ${componentName} - directory not found`);
    return;
  }

  const tsFile = path.join(componentPath, `${componentName}.component.ts`);
  const htmlFile = path.join(componentPath, `${componentName}.component.html`);
  const lessFile = path.join(componentPath, `${componentName}.component.less`);

  // Update TS file
  if (fs.existsSync(tsFile)) {
    let tsContent = fs.readFileSync(tsFile, 'utf8');
    const todoComment = '  // TODO: Thêm @Input và @Output properties theo nhu cầu';
    
    if (tsContent.includes(todoComment)) {
      const generatedCode = generateTS(componentName, config);
      tsContent = tsContent.replace(todoComment, generatedCode);
      fs.writeFileSync(tsFile, tsContent, 'utf8');
      console.log(`✓ Updated ${componentName}.component.ts`);
    }
  }

  // Update HTML file
  if (fs.existsSync(htmlFile)) {
    let htmlContent = fs.readFileSync(htmlFile, 'utf8');
    const todoComment = '<!-- TODO: Thêm nz-';
    
    if (htmlContent.includes(todoComment)) {
      fs.writeFileSync(htmlFile, config.template, 'utf8');
      console.log(`✓ Updated ${componentName}.component.html`);
    }
  }

  // Update LESS file
  if (fs.existsSync(lessFile)) {
    let lessContent = fs.readFileSync(lessFile, 'utf8');
    const todoComment = '// TODO: Thêm custom styles nếu cần';
    
    if (lessContent.includes(todoComment)) {
      const defaultStyle = ':host {\n  display: block;\n}\n';
      lessContent = lessContent.replace(todoComment, defaultStyle);
      fs.writeFileSync(lessFile, lessContent, 'utf8');
      console.log(`✓ Updated ${componentName}.component.less`);
    }
  }
});

console.log('\n✅ Component code generation completed!');
