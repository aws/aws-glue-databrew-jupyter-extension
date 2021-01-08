import {
  Widget as PhosphorWidget,
} from '@phosphor/widgets';

import {
  Widget as LuminoWidget,
} from '@lumino/widgets';

export class PhosphorMainLauncher extends PhosphorWidget {
  /**
   * The image element associated with the widget.
   */
  consoleRoot: HTMLElement;
  /**
   * A path to css assets
   */
  cssPath: string;
}

export class LuminoMainLauncher extends LuminoWidget {
  /**
   * The image element associated with the widget.
   */
  consoleRoot: HTMLElement;
  /**
   * A path to css assets
   */
  cssPath: string;
}

export class MainLauncher {
  static create(version: number, cssPath: string) {
    const widget = version === 1 ? new PhosphorMainLauncher() : new LuminoMainLauncher();

    widget.cssPath = cssPath;
    widget.id = 'aws_glue_databrew_jupyter';
    widget.title.label = 'AWS Glue DataBrew';
    widget.title.closable = true;

    widget.consoleRoot = document.createElement('html');
    widget.consoleRoot.setAttribute('style', 'height: 100%');
    widget.node.appendChild(widget.consoleRoot);

    widget.consoleRoot.insertAdjacentHTML('beforeend',
      `
        <head>
          <meta charset="UTF-8">
          <meta name="awsc-lang" content="en">
          <meta name="aws-glue-databrew-jupyter" content="true">
          <title>AWS</title>
          <link rel="stylesheet" href=` + cssPath + `>
          <style>
            .loader {
              display: inline-block;
              border: 5px solid #f3f3f3;
              border-radius: 50%;
              border-top: 5px solid #3498db;
              width: 40px;
              height: 40px;
              margin-right: 12px;
              -webkit-animation: spin 2s linear infinite;
              animation: spin 2s linear infinite;
            }

            @-webkit-keyframes spin {
              0% { -webkit-transform: rotate(0deg); }
              100% { -webkit-transform: rotate(360deg); }
            }

            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }

            .loader-container {
              font-size: 60px;
              font-weight: 100;
              color: #879196;
              height: 100%;
              width: 100%;
              justify-content: center;
              display: flex;
              align-items: center;
            }
          </style>
        </head>
        <body style="height: 100%">
          <div id="app" style="height: 100%">
            <div class="loader-container">
              <div>
                <div class="loader"></div><span>Launching AWS Glue DataBrew</span>
              </div>
            </div>
          </div>
        </body>
    `,
    );

    return widget;
  }
}
