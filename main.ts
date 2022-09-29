/**
 * Case 1: If the center line following sensor sees a dark black line, move the servos before moving backward.
 */
/**
 * Case 2: If the left line following sensor sees a dark black line, move left servo before moving back and toward the right.
 */
/**
 * Case 3: If the right line following sensor sees a dark black line, move right servo before moving back and toward the left.
 */
input.onButtonPressed(Button.A, function () {
    pins.servoWritePin(AnalogPin.P15, 90)
    pins.servoWritePin(AnalogPin.P16, 90)
    black_Line_L = pins.analogReadPin(AnalogPin.P0)
    black_Line_C = pins.analogReadPin(AnalogPin.P1)
    black_Line_R = pins.analogReadPin(AnalogPin.P2)
    serial.writeLine("set")
    basic.showIcon(IconNames.Yes)
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
    motobit.enable(MotorPower.Off)
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
serial.writeLine("Start")
basic.showIcon(IconNames.SmallHeart)
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
        pins.servoWritePin(AnalogPin.P16, 100)
        basic.pause(100)
        current_surface_reading_L = pins.analogReadPin(AnalogPin.P0)
        current_surface_reading_C = pins.analogReadPin(AnalogPin.P1)
        current_surface_reading_R = pins.analogReadPin(AnalogPin.P2)
        motobit.enable(MotorPower.On)
        if (current_surface_reading_L >= black_Line_L - 100) {
            basic.showLeds(`
                # . . . .
                # . . . .
                . . . . .
                . . . . .
                . . . . .
                `)
            motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 50)
            motobit.setMotorSpeed(Motor.Right, MotorDirection.Reverse, 30)
            basic.pause(50)
        } else if (current_surface_reading_R >= black_Line_R - 100) {
            basic.showLeds(`
                . . . . #
                . . . . #
                . . . . .
                . . . . .
                . . . . .
                `)
            motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 30)
            motobit.setMotorSpeed(Motor.Right, MotorDirection.Reverse, 50)
            basic.pause(50)
        } else if (input.acceleration(Dimension.X) < 10000) {
            basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                . . # . .
                . . # . .
                `)
            motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 100)
            motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 100)
            basic.pause(50)
        } else {
            basic.showLeds(`
                . . # . .
                . . # . .
                . . . . .
                . . . . .
                . . . . .
                `)
            motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 33)
            motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 35)
        }
    }
})
