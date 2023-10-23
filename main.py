def on_uart_data_received():
    global mottatt
    mottatt = bluetooth.uart_read_until(serial.delimiters(Delimiters.DOLLAR))
    drive(mottatt)
bluetooth.on_uart_data_received(serial.delimiters(Delimiters.DOLLAR), on_uart_data_received)

def on_bluetooth_connected():
    bluetooth.start_uart_service()
    music.play(music.string_playable("C D E F G A B C5 ", 700),
        music.PlaybackMode.UNTIL_DONE)
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def drive(text: str):
    if text == "Pil V":
        servos.P1.run(-1 * max_fart)
        servos.P2.run(0)
        basic.pause(svingetid)
        servos.P1.run(-1 * max_fart)
        servos.P2.run(max_fart)
        bluetooth.uart_write_string("ferdig")
    elif text == "Pil H":
        servos.P1.run(0)
        servos.P2.run(max_fart)
        basic.pause(svingetid)
        servos.P1.run(-1 * max_fart)
        servos.P2.run(max_fart)
        bluetooth.uart_write_string("ferdig")
    elif text == "Annet":
        servos.P1.run(-1 * max_fart)
        servos.P2.run(max_fart)
    elif text == "Stop":
        servos.P1.stop()
        servos.P2.stop()
max_fart = 0
mottatt = ""
svingetid = 0
bluetooth.start_uart_service()
svingetid = 2000
basic.show_icon(IconNames.HAPPY)
mottatt = ""
max_fart = 20