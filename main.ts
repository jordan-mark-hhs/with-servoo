/**
 * Case 1: If the center line following sensor sees a dark black line, move the servos before moving backward.
 */
input.onButtonPressed(Button.A, function () {
    pins.servoWritePin(AnalogPin.P15, 90)
    pins.servoWritePin(AnalogPin.P16, 90)
    black_Line_L = pins.analogReadPin(AnalogPin.P0)
    black_Line_C = pins.analogReadPin(AnalogPin.P1)
    black_Line_R = pins.analogReadPin(AnalogPin.P2)
    basic.showString("SET")
    serial.writeLine("set")
})
input.onButtonPressed(Button.AB, function () {
    run = 0
    serial.writeLine("stop")
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.pause(100)
})
input.onButtonPressed(Button.B, function () {
    run = 1
    basic.showString("B")
    serial.writeLine("Run")
})
let current_surface_reading_R = 0
let current_surface_reading_C = 0
let current_surface_reading_L = 0
let black_Line_R = 0
let black_Line_C = 0
let black_Line_L = 0
let run = 0
serial.redirectToUSB()
motobit.enable(MotorPower.Off)
motobit.invert(Motor.Left, true)
motobit.invert(Motor.Right, true)
run = 0
basic.showString("JORDAN")
serial.writeLine("\"Jordan\"")
/**
 * Case 2: If the left line following sensor sees a dark black line, move left servo before moving back and toward the right.
 */
/**
 * Case 3: If the right line following sensor sees a dark black line, move right servo before moving back and toward the left.
 */
basic.forever(function () {
    current_surface_reading_L = pins.analogReadPin(AnalogPin.P0)
    current_surface_reading_C = pins.analogReadPin(AnalogPin.P1)
    current_surface_reading_R = pins.analogReadPin(AnalogPin.P2)
    serial.writeLine("" + current_surface_reading_L + "," + current_surface_reading_C + "," + current_surface_reading_R)
    while (run == 1) {
        serial.writeLine("" + current_surface_reading_L + "," + current_surface_reading_C + "," + current_surface_reading_R)
        pins.servoWritePin(AnalogPin.P15, 0)
        basic.pause(100)
        pins.servoWritePin(AnalogPin.P16, 180)
        basic.pause(100)
        pins.servoWritePin(AnalogPin.P15, 90)
        basic.pause(100)
        pins.servoWritePin(AnalogPin.P16, 90)
        basic.pause(100)
        current_surface_reading_L = pins.analogReadPin(AnalogPin.P0)
        current_surface_reading_C = pins.analogReadPin(AnalogPin.P1)
        current_surface_reading_R = pins.analogReadPin(AnalogPin.P2)
        motobit.enable(MotorPower.On)
        if (current_surface_reading_L >= black_Line_L - 20) {
            basic.showLeds(`
                # . . . .
                # . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
            motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 40)
            motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 40)
            basic.pause(200)
        } else if (current_surface_reading_R >= black_Line_R - 35) {
            basic.showLeds(`
                . . . . #
                . . . . #
                . . . . .
                . . . . .
                . . . . .
                `)
            motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 40)
            motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 40)
            basic.pause(200)
        } else if (current_surface_reading_C >= black_Line_C - 40) {
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . # . .
                . . # . .
                `)
            motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 40)
            motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 40)
            basic.pause(200)
        } else {
            basic.showLeds(`
                . . # . .
                . . # . .
                . . . . .
                . . . . .
                . . . . .
                `)
            motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 40)
            motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 40)
            basic.pause(200)
        }
    }
})
