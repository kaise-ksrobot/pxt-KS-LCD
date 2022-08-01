/**
 * Colors
 */

enum Color {

    //% block="White"
    White = 0xFFFF,
    //% block="Yellow"
    Yellow = 0xFFE0,
    //% block="Orange"
    Orange = 0xFD20,
    //% block="Pink"
    Pink = 0xF81F,
    //% block="Magenta"
    Magenta = 0xF81F,
    //% block="Red"
    Red = 0xF800,
    //% block="Maroon"
    Maroon = 0x7800,
    //% block="Purple"
    Purple = 0x780F,
    //% block="GreenYellow"
    GreenYellow = 0xAFE5,
    //% block="Olive"
    Olive = 0x7BE0,
    //% block="Green"
    Green = 0x07E0,
    //% block="DarkGreen"
    DarkGreen = 0x03E0,
    //% block="Cyan"
    Cyan = 0x07FF,
    //% block="DarkCyan"
    DarkCyan = 0x03EF,
    //% block="Blue"
    Blue = 0x001F,
    //% block="Navy"
    Navy = 0x000F,
    //% block="Silver"
    Silver = 0xC618,
    //% block="DarkGrey"
    DarkGrey = 0x7BEF,
    //% block="Black"
    Black = 0x0000
}


/**
  * KS_LCD V0.010
  */
//% color="#00A6F0" icon="\uf26c" weight=10 block="KS_LCD"
namespace KS_LCD {
    // Display commands & constants


    let TFTWIDTH = 160
    let TFTHEIGHT = 128

    /**
     * TFT Commands
     */
    enum TFTCommands {
        NOP = 0x00,
        SWRESET = 0x01,
        SLPOUT = 0x11,
        NORON = 0x13,
        INVOFF = 0x20,
        DISPOFF = 0x28,
        DISPON = 0x29,
        CASET = 0x2A,
        RASET = 0x2B,
        RAMWR = 0x2C,
        MADCTL = 0x36,
        COLMOD = 0x3A,
        FRMCTR1 = 0xB1,
        FRMCTR2 = 0xB2,
        FRMCTR3 = 0xB3,
        INVCTR = 0xB4,
        PWCTR1 = 0xC0,
        PWCTR2 = 0xC1,
        PWCTR3 = 0xC2,
        PWCTR4 = 0xC3,
        PWCTR5 = 0xC4,
        VMCTR1 = 0xC5,
        GMCTRP1 = 0xE0,
        GMCTRN1 = 0xE1,
        DELAY = 0xFFFF
    }

    /**
     * Unicode representation
     * The unicode table is split into seven parts because of memory size and array size limitations of the microbit
     */
    let fontOne: number[] = [0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422,
        0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422,
        0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422]
    let fontTwo: number[] = [0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422,
        0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x0022d422, 0x00000000, 0x000002e0,
        0x00018060, 0x00afabea, 0x00aed6ea, 0x01991133, 0x010556aa, 0x00000060]
    let fontThree: number[] = [0x000045c0, 0x00003a20, 0x00051140, 0x00023880, 0x00002200, 0x00021080,
        0x00000100, 0x00111110, 0x0007462e, 0x00087e40, 0x000956b9, 0x0005d629, 0x008fa54c, 0x009ad6b7,
        0x008ada88, 0x00119531, 0x00aad6aa, 0x0022b6a2, 0x00000140, 0x00002a00]
    let fontFour: number[] = [0x0008a880, 0x00052940, 0x00022a20, 0x0022d422, 0x00e4d62e, 0x000f14be,
        0x000556bf, 0x0008c62e, 0x0007463f, 0x0008d6bf, 0x000094bf, 0x00cac62e, 0x000f909f, 0x000047f1,
        0x0017c629, 0x0008a89f, 0x0008421f, 0x01f1105f, 0x01f4105f, 0x0007462e]
    let fontFive: number[] = [0x000114bf, 0x000b6526, 0x010514bf, 0x0004d6b2, 0x0010fc21, 0x0007c20f,
        0x00744107, 0x01f4111f, 0x000d909b, 0x00117041, 0x0008ceb9, 0x0008c7e0, 0x01041041, 0x000fc620,
        0x00010440, 0x01084210, 0x00000820, 0x010f4a4c, 0x0004529f, 0x00094a4c]
    let fontSix: number[] = [0x000fd288, 0x000956ae, 0x000097c4, 0x0007d6a2, 0x000c109f, 0x000003a0,
        0x0006c200, 0x0008289f, 0x000841e0, 0x01e1105e, 0x000e085e, 0x00064a4c, 0x0002295e, 0x000f2944,
        0x0001085c, 0x00012a90, 0x010a51e0, 0x010f420e, 0x00644106, 0x01e8221e]
    let fontSeven: number[] = [0x00093192, 0x00222292, 0x00095b52, 0x0008fc80, 0x000003e0, 0x000013f1,
        0x00841080, 0x0022d422];


    /*
     * Send command to display
     */
    function send(command: TFTCommands, parameter: Array<number>): void {
        // set TFT to command-receive mode
        pins.digitalWritePin(DigitalPin.P8, 0)
        // select TFT controller
        pins.digitalWritePin(DigitalPin.P16, 0)
        // Send command
        pins.spiWrite(command)

        // set TFT back to data-receive mode
        pins.digitalWritePin(DigitalPin.P8, 1)

        for (let item of parameter) {
            pins.spiWrite(item)
        }

        // deselect TFT controller
        pins.digitalWritePin(DigitalPin.P16, 1)
    }   




    /*
     * Set pixel address window - minimum and maximum pixel bounds
     */
    function setWindow(x0: number, y0: number, x1: number, y1: number): void {
        send(TFTCommands.CASET, [0x00, x0, 0x00, x1])
        send(TFTCommands.RASET, [0x00, y0, 0x00, y1])
    }

    /*
     * Data-Mode to transfer data to TFT for further processing
     */
    function enterDataMode(): void {
        // Activate command mode
        pins.digitalWritePin(DigitalPin.P8, 0)
        // select TFT as SPI-target
        pins.digitalWritePin(DigitalPin.P16, 0)
        pins.spiWrite(TFTCommands.RAMWR)
        // Activate data mode
        pins.digitalWritePin(DigitalPin.P8, 1)
    }

    /*
     * Finish data-mode and set back to command-mode
     */
    function exitDataMode(): void {
        pins.digitalWritePin(DigitalPin.P16, 1) // de-elect the TFT as SPI target
        pins.digitalWritePin(DigitalPin.P8, 0) // command/data = command
    }


    /*
     * Initial ST735
     */
    //% block="Initialize ST7735"
    //% weight=100
    export function ST7735_SET(): void {
        // Software reset
        send(TFTCommands.SWRESET, [1])
        // Exit Sleep mode
        send(TFTCommands.SLPOUT, [1])
        // Frame rate control - normal mode
        send(TFTCommands.FRMCTR1, [0x01, 0x2C, 0x2D])
        // Frame rate control - idle mode
        //send(TFTCommands.FRMCTR2, [0x01, 0x2C, 0x2D, 0x01, 0x2C, 0x2D])
        send(TFTCommands.FRMCTR2, [0x01, 0x2C, 0x2D]) //By Arthur
        send(TFTCommands.FRMCTR3, [0x01, 0x2C, 0x2D, 0x01, 0x2C, 0x2D]) //By Arthur
        // Display inversion control
        send(TFTCommands.INVCTR, [0x07])
        // Display power control
        send(TFTCommands.PWCTR1, [0xA2, 0x02, 0x84])
        //send(TFTCommands.PWCTR2, [0x8A, 0x2A])
        send(TFTCommands.PWCTR2, [0xC5])    //By Arthur
        send(TFTCommands.PWCTR3, [0x0A, 0x00])
        send(TFTCommands.PWCTR4, [0x8A, 0x2A])
        send(TFTCommands.PWCTR5, [0x8A, 0xEE])
        send(TFTCommands.VMCTR1, [0x0E])

        // Disable inversion
        send(TFTCommands.INVOFF, [])

        // Memory access control
        //send(TFTCommands.MADCTL, [0xA8])
        send(TFTCommands.MADCTL, [0xF7 & 0xA0])

        // Set 16-bit color mode
        send(TFTCommands.COLMOD, [0x05])

        // Column address set
        send(TFTCommands.CASET, [0x00, 0x00, 0x00, 0x7F])
        // Row address set
        send(TFTCommands.RASET, [0x00, 0x00, 0x00, 0x9F])

        // Set Gamma
        //send(TFTCommands.GMCTRP1, [0x02, 0x1C, 0x07, 0x12, 0x37, 0x32, 0x29, 0x2D, 0x29, 0x25, 0x2B, 0x39, 0x00, 0x01, 0x03, 0x10])
        //send(TFTCommands.GMCTRN1, [0x03, 0x1D, 0x07, 0x06, 0x2E, 0x2C, 0x29, 0x2D, 0x2E, 0x2E, 0x37, 0x3F, 0x00, 0x00, 0x02, 0x10])

        send(TFTCommands.GMCTRP1, [0x0f, 0x1a, 0x0f, 0x18, 0x2f, 0x28, 0x20, 0x22, 0x1f, 0x1b, 0x23, 0x37, 0x00, 0x07, 0x02, 0x10])
        send(TFTCommands.GMCTRN1, [0x0f, 0x1b, 0x0f, 0x17, 0x33, 0x2c, 0x29, 0x2e, 0x30, 0x30, 0x39, 0x3f, 0x00, 0x07, 0x03, 0x10])

        // Set normal mode
        send(TFTCommands.NORON, [])

        // Turn display on
        send(TFTCommands.DISPON, [])

    }

    /*
     * Initial TFT setup
     */
    //% block="Initialize TFT Display and SD "
    //% weight=100
    export function tft_sd_init(): void {
        led.enable(false)
        pins.spiPins(DigitalPin.P15, DigitalPin.P14, DigitalPin.P13)
        // set SPI frequency
        pins.spiFrequency(4000000)
        pins.spiFormat(8, 0)



        ST7735_SET()
        //Clear screen
        drawRectangle(0, 0, TFTWIDTH, TFTHEIGHT, 0)


    }


    /*
     * Initial TFT setup
     */
    //% block="Initialize TFT Display"
    //% weight=100
    export function tft_init(): void {
        pins.spiPins(DigitalPin.P15, DigitalPin.P0, DigitalPin.P13)
        // set SPI frequency
        pins.spiFrequency(4000000)
        pins.spiFormat(8,0)


        ST7735_SET()
        //Clear screen
        drawRectangle(0, 0, TFTWIDTH, TFTHEIGHT, 0)


    }

    /*
     * Draw single pixel
     */
    //% block="Draw single pixel at x:%x|y:%y with color:%color"
    //% x.min=0 x.max=160
    //% y.min=0 y.max=128
    //% weight=90
    export function drawPixel(x: number, y: number, color: Color): void {
        setWindow(x, y, x + 1, y + 1)
        send(TFTCommands.RAMWR, [color >> 8, color])
    }

    /*
     * Draw a straight line from one point to another
     */
    //% block="Draw line from x0:%x0|y0:%y0 to x1:%x1|y:%y1 with color:%color"
    //% x0.min=0 x0.max=160
    //% y0.min=0 y0.max=128
    //% x1.min=0 x1.max=160
    //% y1.min=0 y1.max=128
    //% weight=85
    export function drawLine(x0: number, y0: number, x1: number, y1: number, color: Color): void {
        let xDelta = x1 - x0
        let yDelta = y1 - y0

        if (Math.abs(yDelta) > Math.abs(xDelta)) {
            let ySteps = Math.abs(yDelta)
            let xIncrement = xDelta == 0 ? 0 : xDelta / ySteps
            let yIncrement = yDelta > 0 ? 1 : -1

            let x = x0
            let y = y0
            for (let steps = 0; steps <= ySteps; steps++) {
                drawPixel(x, y, color)
            }
        }
        else {
            let xSteps = Math.abs(xDelta)
            let yIncrement = yDelta == 0 ? 0 : yDelta / xSteps
            let xIncrement = xDelta > 0 ? 1 : -1

            let y = y0
            let x = x0
            for (let steps = 0; steps <= xSteps; steps++) {
                drawPixel(x, y, color)
                y = y + yIncrement
                x = x + xIncrement
            }
        }
    }

    /*
     * Draw rectangle with a given color
     */
    //% block="Draw rectangle at x:%x|y:%y with width:%width|height:%height|color:%color"
    //% x.min=0 x.max=160
    //% y.min=0 y.max=128
    //% width.min=0 width.max=160
    //% height.min=0 height.max=128
    //% weight=80
    export function drawRectangle(x: number, y: number, width: number, height: number, color: Color): void {

        // Convert color
        let hiColor = (color >> 8) % 256
        let loColor = color % 256

        setWindow(x, y, x + width - 1, y + height - 1)
        enterDataMode()

        // Draw rectangle
        for (let indexY = height; indexY > 0; indexY--) {
            for (let indexX = width; indexX > 0; indexX--) {
                pins.spiWrite(hiColor);
                pins.spiWrite(loColor);
            }
        }

        exitDataMode()
    }

    /*
     * Draw circle with a given radius
     */
    //% block="Draw circle at: x:%x|y:%y with radius:%r and color:%color"
    //% x.min=0 x.max=160
    //% y.min=0 y.max=128
    //% weight=75
    export function drawCircle(x: number, y: number, radius: number, color: Color): void {
        for (let y1 = -radius; y1 <= 0; y1++) {
            for (let x1 = -radius; x1 <= 0; x1++) {
                if ((x1 * x1 + y1 * y1) <= (radius * radius)) {
                    drawPixel(x + x1, y + y1, color)
                    drawPixel(x + x1, y - y1, color)
                    drawPixel(x - x1, y + y1, color)
                    drawPixel(x - x1, y - y1, color)
                }
            }
        }
    }

    /*
     * Display string at given coordinates
     */
    //% block="Show string:%text at x:%x and y:%y with font-size:%zoom color:%color and background color:%bgcolor"
    //% weight=70
    //% x.min=0 x.max=160
    //% y.min=0 y.max=128
    //% zoom.min=1 zoom.max=5 zoom.defl=2
    export function showString(text: string, x: number, y: number, zoom: number, color: Color, bgColor: Color): void {
        let hiColor = (color >> 8) % 256
        let loColor = color % 256
        let bgHiColor = (bgColor >> 8) % 256
        let bgLoColor = bgColor % 256
        let zoomFactor = zoom
        let index = 0
        let colsel = 0
        let unicode = 0
        let charIndex = 0

        for (let stringPos = 0; stringPos < text.length; stringPos++) {
            // Get character at current string position and find the corresponding unicode representation
            charIndex = text.charCodeAt(stringPos)
            if (charIndex < 20) {
                unicode = fontOne[charIndex]
            }
            else if (charIndex < 40) {
                unicode = fontTwo[charIndex - 20]
            }
            else if (charIndex < 60) {
                unicode = fontThree[charIndex - 40]
            }
            else if (charIndex < 80) {
                unicode = fontFour[charIndex - 60]
            }
            else if (charIndex < 100) {
                unicode = fontFive[charIndex - 80]
            }
            else if (charIndex < 120) {
                unicode = fontSix[charIndex - 100]
            }
            else if (charIndex < 140) {
                unicode = fontSeven[charIndex - 120]
            }

            // Set position and go into data mode
            setWindow(x + stringPos * 5 * zoomFactor, y, x + stringPos * 5 * zoomFactor + 5 * zoomFactor - 1, y + 5 * zoomFactor - 1)
            enterDataMode()

            // write character to display
            for (let indexY = 0; indexY < 5; indexY++) {
                for (let a = 0; a < zoomFactor; a++) {
                    for (let indexX = 0; indexX < 5; indexX++) {
                        index = indexY + indexX * 5
                        colsel = (unicode & (1 << index))
                        for (let b = 0; b < zoomFactor; b++) {
                            if (colsel) {
                                pins.spiWrite(hiColor);
                                pins.spiWrite(loColor);
                            }
                            else {
                                pins.spiWrite(bgHiColor);
                                pins.spiWrite(bgLoColor);
                            }
                        }
                    }
                }
            }

            exitDataMode();
        }
    }

    /*
    * Display string at given coordinates
    */
    //% block="Show number:%value at x:%x and y:%y with font-size:%zoom color:%color and background color:%bgcolor"
    //% weight=70
    //% x.min=0 x.max=160
    //% y.min=0 y.max=128
    //% zoom.min=1 zoom.max=5 zoom.defl=2
    export function showNumber(value: number, x: number, y: number, zoom: number, color: Color, bgColor: Color): void {
        showString(convertToText(value), x, y, zoom, color, bgColor);

    }




    //% block="Clear screen"
    //% weight=65
    export function clearScreen(): void {
        drawRectangle(0, 0, TFTWIDTH, TFTHEIGHT, 0)
    }

}
