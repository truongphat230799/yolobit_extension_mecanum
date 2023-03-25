from yolobit import *
import machine
from machine import *
import time
from utility import *
import line_array


class Mecanum():

    def __init__(self):        
        # line IR sensors
        try:
            self.pcf = line_array.PCF8574(
                machine.SoftI2C(
                    scl=machine.Pin(22), 
                    sda=machine.Pin(21)), 0x23)
        except:
            say('Line IR sensors not detected')
            self.pcf = None
        say('Mecanum setup done!')


    def read_line_sensors(self, index=0):
        '''
        self.pcf.pin(0) = 0 white line
        self.pcf.pin(0) = 1 black line
        '''
        if index < 0 or index > 4:
            return 1
 
        if index == 0:
            if self.pcf:
                return (self.pcf.pin(0), self.pcf.pin(1), self.pcf.pin(2), self.pcf.pin(3))
            else:
                return (1, 1, 1, 1) # cannot detect black line
        else:
            if self.pcf:
                return self.pcf.pin(index-1)
            else:
                return 1

mecanum = Mecanum()
