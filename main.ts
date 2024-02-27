bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Dollar), function () {
    mottatt = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Dollar))
    drive(mottatt)
})
bluetooth.onBluetoothConnected(function () {
    bluetooth.startUartService()
    music.play(music.stringPlayable("C D E F G A B C5 ", 700), music.PlaybackMode.UntilDone)
    basic.showLeds(`
        . . # # .
        # . # . #
        . # # # .
        # . # . #
        . . # # .
        `)
})
input.onButtonPressed(Button.A, function () {
    servos.P1.run(-1 * max_fart)
    servos.P2.run(max_fart)
    basic.pause(svingetid)
    servos.P1.stop()
    servos.P2.stop()
})
function drive (mottatt: string) {
    if (mottatt == "Pil V") {
        servos.P1.run(-1 * max_fart)
        servos.P2.run(0)
        basic.pause(svingetid)
        servos.P1.run(0)
        servos.P2.run(0)
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
    } else if (mottatt == "Pil H") {
        servos.P1.run(0)
        servos.P2.run(max_fart)
        basic.pause(svingetid)
        servos.P1.run(0)
        servos.P2.run(0)
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
    } else if (mottatt == "Annet") {
        servos.P1.run(-1 * max_fart)
        servos.P2.run(max_fart)
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    } else if (mottatt == "Stop") {
        servos.P1.stop()
        servos.P2.stop()
        basic.showString("S")
    }
    bluetooth.uartWriteString("ferdig")
}
let max_fart = 0
let mottatt = ""
let svingetid = 0
bluetooth.startUartService()
svingetid = 2000
basic.showIcon(IconNames.Happy)
mottatt = ""
max_fart = 20
