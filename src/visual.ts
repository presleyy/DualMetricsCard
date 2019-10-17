module powerbi.extensibility.visual {
    // d3
    import Selection = d3.Selection;
    import UpdateSelection = d3.selection.Update;
    import Arc = d3.svg.arc.Arc;
    import SvgArc = d3.svg.Arc;
    import Linear = d3.scale.Linear;

    // powerbi
    import IDataViewObject = powerbi.DataViewObject;
    import PrimitiveValue = powerbi.PrimitiveValue;
    import IViewport = powerbi.IViewport;
    import DataViewObjectPropertyIdentifier = powerbi.DataViewObjectPropertyIdentifier;
    import DataView = powerbi.DataView;
    import DataViewCategorical = powerbi.DataViewCategorical;
    import DataViewValueColumns = powerbi.DataViewValueColumns;
    import DataViewValueColumnGroup = powerbi.DataViewValueColumnGroup;
    import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
    import IDataViewObjects = powerbi.DataViewObjects;
    import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
    import VisualObjectInstanceEnumeration = powerbi.VisualObjectInstanceEnumeration;
    import VisualObjectInstance = powerbi.VisualObjectInstance;

    // powerbi.extensibility
    import IColorPalette = powerbi.extensibility.IColorPalette;
    import IVisual = powerbi.extensibility.IVisual;
    import ISelectionId = powerbi.extensibility.ISelectionId;
    import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
    import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
    import IVisualHost = powerbi.extensibility.visual.IVisualHost;

    // powerbi.visuals
    import IVisualSelectionId = powerbi.visuals.ISelectionId;

    // powerbi.extensibility.utils.svg
    import IMargin = powerbi.extensibility.utils.svg.IMargin;
    import translate = powerbi.extensibility.utils.svg.translate;
    import ClassAndSelector = powerbi.extensibility.utils.svg.CssConstants.ClassAndSelector;
    import CreateClassAndSelector = powerbi.extensibility.utils.svg.CssConstants.createClassAndSelector;

    // powerbi.extensibility.utils.formatting
    import TextProperties = powerbi.extensibility.utils.formatting.TextProperties;
    import valueFormatter = powerbi.extensibility.utils.formatting.valueFormatter;
    import IValueFormatter = powerbi.extensibility.utils.formatting.IValueFormatter;
    import textMeasurementService = powerbi.extensibility.utils.formatting.textMeasurementService;

    // powerbi.extensibility.utils.interactivity
    import IInteractivityService = powerbi.extensibility.utils.interactivity.IInteractivityService;
    import IInteractiveBehavior = powerbi.extensibility.utils.interactivity.IInteractiveBehavior;
    import createInteractivityService = powerbi.extensibility.utils.interactivity.createInteractivityService;

    // powerbi.extensibility.utils.type
    import PixelConverter = powerbi.extensibility.utils.type.PixelConverter;

    // powerbi.extensibility.utils.color
    import ColorHelper = powerbi.extensibility.utils.color.ColorHelper;

    // powerbi.extensibility.utils.tooltip
    import TooltipEventArgs = powerbi.extensibility.utils.tooltip.TooltipEventArgs;
    import ITooltipServiceWrapper = powerbi.extensibility.utils.tooltip.ITooltipServiceWrapper;
    import createTooltipServiceWrapper = powerbi.extensibility.utils.tooltip.createTooltipServiceWrapper;

    // powerbi.extensibility.utils.dataview
    import DataViewObject = powerbi.extensibility.utils.dataview.DataViewObject;
    import DataViewObjects = powerbi.extensibility.utils.dataview.DataViewObjects;

    // powerbi.extensibility.utils.chart
    import LegendModule = powerbi.extensibility.utils.chart.legend;
    import ILegend = powerbi.extensibility.utils.chart.legend.ILegend;
    import LegendData = powerbi.extensibility.utils.chart.legend.LegendData;
    import LegendDataPoint = powerbi.extensibility.utils.chart.legend.LegendDataPoint;
    import LegendDataModule = powerbi.extensibility.utils.chart.legend.data;
    import LegendIcon = powerbi.extensibility.utils.chart.legend.LegendIcon;
    import legendProps = powerbi.extensibility.utils.chart.legend.legendProps;
    import legendPosition = powerbi.extensibility.utils.chart.legend.position;
    import createLegend = powerbi.extensibility.utils.chart.legend.createLegend;
    import LegendPosition = powerbi.extensibility.utils.chart.legend.LegendPosition;
    import ILabelLayout = powerbi.extensibility.utils.chart.dataLabel.ILabelLayout;
    import OutsidePlacement = powerbi.extensibility.utils.chart.dataLabel.OutsidePlacement;
    import OpacityLegendBehavior = powerbi.extensibility.utils.chart.legend.OpacityLegendBehavior;

    export class Visual implements IVisual {
        private target: HTMLElement;
        private updateCount: number;
        private settings: VisualSettings;
        private textNode: Text;
        private cardImage: string;
        private cardTitle: string;
        private cardDescription: string;
        private imageBox: HTMLImageElement;
        private titleBox: HTMLParagraphElement;
        private descBox: HTMLParagraphElement;
        private moneBox: HTMLParagraphElement;
        private mtwoBox: HTMLParagraphElement;

        private moneBoxText: HTMLSpanElement;
        private moneBoxPrefix: HTMLSpanElement;
        private moneBoxSuffix: HTMLSpanElement;

        private mtwoBoxText: HTMLSpanElement;
        private mtwoBoxPrefix: HTMLSpanElement;
        private mtwoBoxSuffix: HTMLSpanElement;

        constructor(options: VisualConstructorOptions) {
            console.log('Presley Visual constructor', options);
            this.target = options.element;
            if (typeof document !== "undefined") {
                this.target.innerHTML = `<div class="metrics-container"><p class="metrics metrics-one"><span></span><span></span><span></span></p><p class="metrics metrics-two"><span></span>&nbsp;<span></span>&nbsp;<span></span></p></div>`
                
                this.moneBox = this.target.childNodes[0].childNodes[0] as HTMLParagraphElement;
                this.moneBoxPrefix = this.moneBox.childNodes[0] as HTMLSpanElement;
                this.moneBoxText = this.moneBox.childNodes[1] as HTMLSpanElement;
                this.moneBoxSuffix = this.moneBox.childNodes[2] as HTMLSpanElement;
                
                this.mtwoBox = this.target.childNodes[0].childNodes[1] as HTMLParagraphElement;
                this.mtwoBoxPrefix = this.mtwoBox.childNodes[0] as HTMLSpanElement;
                this.mtwoBoxText = this.mtwoBox.childNodes[2] as HTMLSpanElement;
                this.mtwoBoxSuffix = this.mtwoBox.childNodes[4] as HTMLSpanElement;
            }
        }

        public update(options: VisualUpdateOptions) {
            let dataView: DataView = options.dataViews[0];

            this.settings = VisualSettings.parse<VisualSettings>(dataView);

            if(this.settings.Layout.vertical === true){
                this.moneBox.style.display = "block";
                this.moneBox.style.width = "100%";
                this.mtwoBox.style.display = "block";
                this.mtwoBox.style.width = "100%";
            }
            else{
                this.moneBox.style.display = "inline-block";
                this.moneBox.style.width = this.settings.Layout.widthOne.toString()+"%";
                this.mtwoBox.style.display = "inline-block";
                this.mtwoBox.style.width = this.settings.Layout.widthTwo.toString()+"%";
            }

            this.moneBox.style.fontSize = this.settings.MOneStyle.fontSize.toString() + "pt";
            this.moneBox.style.color = this.settings.MOneStyle.foreColor.solid.color;
            this.moneBox.style.textAlign = this.settings.MOneStyle.alignment;

            this.mtwoBox.style.fontSize = this.settings.MTwoStyle.fontSize.toString() + "pt";
            this.mtwoBox.style.color = this.settings.MTwoStyle.foreColor.solid.color;
            this.mtwoBox.style.textAlign = this.settings.MTwoStyle.alignment;

            this.moneBoxPrefix.innerText = "";
            this.moneBoxText.innerText = "";
            this.moneBoxSuffix.innerText = "";

            this.mtwoBoxPrefix.innerText = "";
            this.mtwoBoxText.innerText = "";
            this.mtwoBoxSuffix.innerText = "";

            let hasMOne: boolean = false;
            let hasMTwo: boolean = false;
            dataView.table.columns.forEach((column: DataViewMetadataColumn, index: number) => {
                if (column.roles["MOne"]) {
                    if (dataView.table.rows[0][index] != null) {
                        hasMOne = true;

                        let formatter = valueFormatter.create({
                            format: valueFormatter.getFormatStringByColumn(column, true),
                        });
                        if(this.settings.MOneStyle.kmformat){
                            if(dataView.table.rows[0][index] > 1000000){
                                formatter = valueFormatter.create({
                                    format: "#,##,,.00M"
                                });
                            }
                            else if(dataView.table.rows[0][index] > 1000){
                                formatter = valueFormatter.create({
                                    format: "#,.00K"
                                });
                            }
                        }
                        
                        let plusText = "";
                        if (this.settings.MOneStyle.plus && Number(dataView.table.rows[0][index])) {
                            if (Number(dataView.table.rows[0][index]) > 0) {
                                plusText = "+";
                            }
                        }
                        this.moneBoxPrefix.innerText = this.settings.MOneStyle.prefix;
                        this.moneBoxText.innerText = plusText + formatter.format(dataView.table.rows[0][index])
                        this.moneBoxSuffix.innerText = this.settings.MOneStyle.suffix;
                    }
                }
                if (column.roles["MTwo"]) {
                    if(dataView.table.rows[0][index]!=null){
                        hasMTwo = true;

                        let formatter = valueFormatter.create({
                            format: valueFormatter.getFormatStringByColumn(column, true),
                        });
                        if(this.settings.MTwoStyle.kmformat){
                            if(dataView.table.rows[0][index] > 1000000){
                                formatter = valueFormatter.create({
                                    format: "#,##,,.00M"
                                });
                            }
                            else if(dataView.table.rows[0][index] > 1000){
                                formatter = valueFormatter.create({
                                    format: "#,.00K"
                                });
                            }
                        }

                        let plusText = "";
                        if(this.settings.MTwoStyle.plus && Number(dataView.table.rows[0][index])){
                            if(Number(dataView.table.rows[0][index]) > 0){
                                plusText = "+";
                            }
                        }
                        this.mtwoBoxPrefix.innerText = this.settings.MTwoStyle.prefix;
                        this.mtwoBoxText.innerText = plusText + formatter.format(dataView.table.rows[0][index]);
                        this.mtwoBoxSuffix.innerText = this.settings.MTwoStyle.suffix;
                    }
                }
                if (column.roles["COne"]) {
                    let formatter = valueFormatter.create({
                        format: valueFormatter.getFormatStringByColumn(column, true),
                    });
                    this.moneBoxPrefix.style.color = formatter.format(dataView.table.rows[0][index]);
                    this.moneBoxText.style.color = formatter.format(dataView.table.rows[0][index]);
                    this.moneBoxSuffix.style.color = formatter.format(dataView.table.rows[0][index]);
                }
                if (column.roles["CTwo"]) {
                    let formatter = valueFormatter.create({
                        format: valueFormatter.getFormatStringByColumn(column, true),
                    });
                    this.mtwoBoxPrefix.style.color = formatter.format(dataView.table.rows[0][index]);
                    this.mtwoBoxText.style.color = formatter.format(dataView.table.rows[0][index]);
                    this.mtwoBoxSuffix.style.color = formatter.format(dataView.table.rows[0][index]);
                }
            });
            if (hasMOne && !hasMTwo) {
                this.moneBox.style.display = "block";
                this.moneBox.style.width = "100%";
                this.moneBox.style.textAlign = "center";
                this.mtwoBox.style.display = "none";
            }
            else if (!hasMOne && hasMTwo) {
                this.moneBox.style.display = "none";
                this.mtwoBox.style.display = "block";
                this.mtwoBox.style.width = "100%";
                this.mtwoBox.style.textAlign = "center";
            }
        }

        private static parseSettings(dataView: DataView): VisualSettings {
            return VisualSettings.parse(dataView) as VisualSettings;
        }

        /** 
         * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the 
         * objects and properties you want to expose to the users in the property pane.
         * 
         */
        public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
            return VisualSettings.enumerateObjectInstances(this.settings || VisualSettings.getDefault(), options);
        }
    }
}