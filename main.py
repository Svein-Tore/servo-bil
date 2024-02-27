def on_uart_data_received():
    global mottatt2
    mottatt2 = bluetooth.uart_read_until(serial.delimiters(Delimiters.DOLLAR))
    drive(mottatt2)
bluetooth.on_uart_data_received(serial.delimiters(Delimiters.DOLLAR), on_uart_data_received)

def on_bluetooth_connected():
    bluetooth.start_uart_service()
    music.play(music.string_playable("C D E F G A B C5 ", 700),
        music.PlaybackMode.UNTIL_DONE)
    basic.show_leds("""
        . . # # .
        # . # . #
        . # # # .
        # . # . #
        . . # # .
        """)
bluetooth.on_bluetooth_connected(on_bluetooth_connected)

def on_button_pressed_a():
    servos.P1.run(-1 * max_fart)
    servos.P2.run(max_fart)
    basic.pause(svingetid)
    servos.P1.stop()
    servos.P2.stop()
input.on_button_pressed(Button.A, on_button_pressed_a)

def drive(mottatt: str):
    if mottatt == "Pil V":
        servos.P1.run(-1 * max_fart)
        servos.P2.run(0)
        basic.pause(svingetid)
        servos.P1.run(-1 * max_fart)
        servos.P2.run(max_fart)
        basic.show_leds("""
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            """)
    elif mottatt == "Pil H":
        servos.P1.run(0)
        servos.P2.run(max_fart)
        basic.pause(svingetid)
        servos.P1.run(-1 * max_fart)
        servos.P2.run(max_fart)
        basic.show_leds("""
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            """)
    elif mottatt == "Annet":
        servos.P1.run(-1 * max_fart)
        servos.P2.run(max_fart)
        basic.show_leds("""
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            """)
    elif mottatt == "Stop":
        servos.P1.stop()
        servos.P2.stop()
        basic.show_string("S")
    bluetooth.uart_write_string("ferdig")
max_fart = 0
mottatt2 = ""
svingetid = 0
bluetooth.start_uart_service()
svingetid = 2000
basic.show_icon(IconNames.HAPPY)
mottatt2 = ""
max_fart = 20