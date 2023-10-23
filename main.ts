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
function drive (text: string) {
    if (text == "Pil V") {
        servos.P1.run(-1 * max_fart)
        servos.P2.run(0)
        basic.pause(svingetid)
        servos.P1.run(-1 * max_fart)
        servos.P2.run(max_fart)
        bluetooth.uartWriteString("ferdig")
    } else if (text == "Pil H") {
        servos.P1.run(0)
        servos.P2.run(max_fart)
        basic.pause(svingetid)
        servos.P1.run(-1 * max_fart)
        servos.P2.run(max_fart)
        bluetooth.uartWriteString("ferdig")
    } else if (text == "Annet") {
        servos.P1.run(-1 * max_fart)
        servos.P2.run(max_fart)
    } else if (text == "Stop") {
        servos.P1.stop()
        servos.P2.stop()
    }
}
let max_fart = 0
let mottatt = ""
let svingetid = 0
bluetooth.startUartService()
svingetid = 2000
basic.showIcon(IconNames.Happy)
mottatt = ""
max_fart = 20
