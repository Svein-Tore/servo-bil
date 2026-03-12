bluetooth.onUartDataReceived(serial.delimiters(Delimiters.Dollar), function () {
    mottatt = bluetooth.uartReadUntil(serial.delimiters(Delimiters.Dollar))
    if (mottatt != kontroll) {
        drive(mottatt)
        kontroll = mottatt
    }
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
    basic.pause(svingetid)
    servos.P1.stop()
})
function drive (mottatt: string) {
    if (mottatt == "pil v") {
        servos.P2.run(-1 * max_fart)
        servos.P0.run(0)
        basic.pause(svingetid)
        servos.P2.run(0)
        servos.P0.run(0)
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
    } else if (mottatt == "pil h") {
        servos.P2.run(0)
        servos.P0.run(max_fart)
        basic.pause(svingetid)
        servos.P2.run(0)
        servos.P0.run(0)
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
    } else if (mottatt == "annet") {
        servos.P2.run(-1 * max_fart)
        servos.P0.run(max_fart)
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    } else if (mottatt == "stop") {
        servos.P2.stop()
        servos.P0.stop()
        basic.showString("S")
    }
    bluetooth.uartWriteString("ferdig")
}
input.onButtonPressed(Button.AB, function () {
    servos.P1.run(-1 * max_fart)
    servos.P0.run(max_fart)
    basic.pause(svingetid)
    servos.P1.stop()
    servos.P0.stop()
})
input.onButtonPressed(Button.B, function () {
    servos.P0.run(max_fart)
    basic.pause(svingetid)
    servos.P0.stop()
})
let max_fart = 0
let mottatt = ""
let kontroll = ""
let svingetid = 0
bluetooth.startUartService()
svingetid = 2000
kontroll = "hvasomhelst"
basic.showIcon(IconNames.Happy)
mottatt = ""
max_fart = 20
