import { Injectable } from '@angular/core';
import { InConfiguration } from '../interfaces/config.interface';

@Injectable()
export class ConfigService {
  public configData: InConfiguration;

  constructor() {
    this.setConfigData();
  }

  setConfigData() {
    this.configData = {
      layout: {
        variant: 'dark', // options:  light & dark
        theme_color: 'black', // options:  white, black, purple, blue, cyan, green, orange
        logo_bg_color: 'black', // options:  white, black, purple, blue, cyan, green, orange
        sidebar: {
          collapsed: false, // options:  true & false
          backgroundColor: 'dark', // options:  light & dark
        },
      },
    };
  }
}
