input.onButtonPressed(Button.A, function () {
    pins.servoWritePin(AnalogPin.P15, 90)
    pins.servoWritePin(AnalogPin.P16, 90)
    black_Line_L = pins.analogReadPin(AnalogPin.P0)
    black_Line_C = pins.analogReadPin(AnalogPin.P1)
    black_Line_R = pins.analogReadPin(AnalogPin.P2)
})
input.onButtonPressed(Button.AB, function () {
    run = 1
    motobit.enable(MotorPower.On)
    motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 40)
    motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 40)
    basic.pause(200)
})
input.onButtonPressed(Button.B, function () {
    pins.servoWritePin(AnalogPin.P15, 45)
    pins.servoWritePin(AnalogPin.P16, 45)
})
let current_surface_reading_R = 0
let current_surface_reading_C = 0
let current_surface_reading_L = 0
let run = 0
let black_Line_R = 0
let black_Line_C = 0
let black_Line_L = 0
motobit.enable(MotorPower.Off)
motobit.invert(Motor.Left, true)
motobit.invert(Motor.Right, true)
black_Line_L = pins.analogReadPin(AnalogPin.P0)
black_Line_C = pins.analogReadPin(AnalogPin.P1)
black_Line_R = pins.analogReadPin(AnalogPin.P2)
run = 0
basic.showLeds(`
    . . # . .
    . # . # .
    # # # # #
    . # . # .
    . . # . .
    `)
basic.showLeds(`
    . # . # .
    # . . . #
    # # # # #
    # . . . #
    . # . # .
    `)
basic.showLeds(`
    # . . . #
    . . . . .
    # # . # #
    . . . . .
    # . . . #
    `)
basic.showLeds(`
    . . . . .
    . . . . .
    # . . . #
    . . . . .
    . . . . .
    `)
basic.showLeds(`
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    . . . . .
    `)
/**
 * Case 1: If the center line following sensor sees a dark black line, move the servos before moving backward.
 */
/**
 * Case 2: If the left line following sensor sees a dark black line, move left servo before moving back and toward the right.
 */
/**
 * Case 3: If the right line following sensor sees a dark black line, move right servo before moving back and toward the left.
 */
basic.forever(function () {
    while (run == 1) {
        current_surface_reading_L = pins.analogReadPin(AnalogPin.P0)
        current_surface_reading_C = pins.analogReadPin(AnalogPin.P1)
        current_surface_reading_R = pins.analogReadPin(AnalogPin.P2)
        motobit.enable(MotorPower.On)
        if (current_surface_reading_C <= black_Line_C - 40) {
            for (let index = 0; index < 5; index++) {
                pins.servoWritePin(AnalogPin.P15, 90)
                pins.servoWritePin(AnalogPin.P16, 90)
                basic.pause(100)
                pins.servoWritePin(AnalogPin.P15, 45)
                pins.servoWritePin(AnalogPin.P16, 45)
                basic.pause(100)
            }
            motobit.setMotorSpeed(Motor.Left, MotorDirection.Reverse, 75)
            motobit.setMotorSpeed(Motor.Right, MotorDirection.Reverse, 75)
            basic.pause(200)
        } else {
            motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 40)
            motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 40)
            basic.pause(200)
        }
        if (current_surface_reading_L <= black_Line_L - 100) {
            for (let index = 0; index < 5; index++) {
                basic.pause(50)
                pins.servoWritePin(AnalogPin.P15, 90)
                basic.pause(100)
                pins.servoWritePin(AnalogPin.P15, 45)
                basic.pause(100)
            }
            motobit.setMotorSpeed(Motor.Left, MotorDirection.Reverse, 75)
            motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 25)
            basic.pause(200)
        } else if (current_surface_reading_R <= black_Line_R - 100) {
            for (let index = 0; index < 5; index++) {
                basic.pause(50)
                pins.servoWritePin(AnalogPin.P16, 90)
                basic.pause(100)
                pins.servoWritePin(AnalogPin.P16, 45)
                basic.pause(100)
            }
            motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 25)
            motobit.setMotorSpeed(Motor.Right, MotorDirection.Reverse, 75)
            basic.pause(200)
        } else {
            motobit.setMotorSpeed(Motor.Left, MotorDirection.Forward, 40)
            motobit.setMotorSpeed(Motor.Right, MotorDirection.Forward, 40)
            basic.pause(200)
        }
        motobit.enable(MotorPower.Off)
    }
})
