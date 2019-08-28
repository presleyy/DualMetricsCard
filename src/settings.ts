/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

module powerbi.extensibility.visual {
    import DataViewObjectsParser = powerbi.extensibility.utils.dataview.DataViewObjectsParser;
    import LegendPosition = powerbi.extensibility.utils.chart.legend.LegendPosition;

    export class RadarChartSettings extends DataViewObjectsParser {
        public legend: LegendSettings = new LegendSettings();
        public labels: LabelSettings = new LabelSettings();
        public dataPoint: DataPointSettings = new DataPointSettings();
        public line: LineSettings = new LineSettings();
        public displaySettings: DisplaySettings = new DisplaySettings();
    }

    export class LegendSettings {
        public show: boolean = true;
        public showTitle: boolean = true;
        public titleText: string = "";
        public actualText: string = "Actual";
        public targetText: string = "Target";
        public labelColor: string = "black";
        public fontSize: number = 8;
        public position: string = LegendPosition[LegendPosition.Top];
    }

    export class DataPointSettings {
        public fill: string = "";
    }

    export class LabelSettings {
        public show: boolean = true;
        public color: string = "#000";
        public fontSize: number = 8;
    };

    export class LineSettings {
        public show: boolean = false;
        public lineWidth: number = 5;
    }

    export class DisplaySettings {
        public minValue: number = 0;
        public axisBeginning: number = -1;
    }

    export class VisualSettings extends DataViewObjectsParser {
      public dataPoint: dataPointSettings = new dataPointSettings();
      public image: imageSetting = new imageSetting();
      public MOneStyle: MOneStyleSetting = new MOneStyleSetting();
      public MTwoStyle: MTwoStyleSetting = new MTwoStyleSetting();
    }

    export class dataPointSettings {
     // Default color
      public defaultColor: string = "";
     // Show all
      public showAllDataPoints: boolean = true;
     // Fill
      public fill: string = "";
     // Color saturation
      public fillRule: string = "";
     // Text Size
      public fontSize: number = 12;
     }

     export class imageSetting {
      public height: number = 200;
     }

     export class MOneStyleSetting {
      public fontSize: number = 20;
      public foreColor: FillColor = new FillColor();
      public alignment: string = "center";
      public prefix: string = "";
      public suffix: string = "";
      public plus: boolean = false;
     }

     export class MTwoStyleSetting {
      public fontSize: number = 16;
      public foreColor: FillColor = new FillColor();
      public alignment: string = "center";
      public prefix: string = "";
      public suffix: string = "";
      public plus: boolean = false;
     }

     export class FillColor{
        public solid: SolidColor = new SolidColor();
    }

     export class SolidColor{
         public color: string = "black";
     }
}