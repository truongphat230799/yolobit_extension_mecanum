import machine
from time import sleep
from struct import pack, unpack


MD4C_DEFAULT_I2C_ADDRESS = 0x30

MD4C_MOTOR_MAX_SPEED = 100

MD4C_REG_CH1 = const(0)
MD4C_REG_CH2 = const(1)
MD4C_REG_CH3 = const(2)
MD4C_REG_CH4 = const(3)
MD4C_REG_WHO_AM_I = const(5)

class MotorDriver4Channel():
    def __init__(self, i2c, address=MD4C_DEFAULT_I2C_ADDRESS):
        self._i2c = i2c
        self._addr = address
        #check connection, not for now
        who_am_i = MD4C_DEFAULT_I2C_ADDRESS # turn off who am i if while not implemented
        '''
        try: 
            who_am_i = self._read_8(MD4C_REG_WHO_AM_I)
        except OSError:
            who_am_i = 0
        '''
        
        if who_am_i != MD4C_DEFAULT_I2C_ADDRESS:
            print(who_am_i);
            raise RuntimeError("Could not find motor driver at address 0x{:X}".format(address))
        else:
            # enable motors
            self.set_motors(0)
            print("Motor driver 4 channel initialized")


######## MOTOR CONTROL ##################################

    def set_motor(self, motor, speed):
        if motor not in (0, 1, 2, 3):
            raise RuntimeError('Invalid motor number')
        
        if speed < -MD4C_MOTOR_MAX_SPEED:
            speed = -MD4C_MOTOR_MAX_SPEED
        elif speed > MD4C_MOTOR_MAX_SPEED:
            speed = MD4C_MOTOR_MAX_SPEED
        
        if speed < 0:
            dir = 0
            speed = - speed
        else:
            dir = 1
        #data_test = [\x00, \x00, \x60]
        self._write(MD4C_REG_CH1+motor, pack('BB', dir, speed))
        #self._write(MD4C_REG_CH1+motor, data_test)
    
    def set_motor_time(self, motor, speed, t = None):
        if motor not in (0, 1, 2, 3):
            raise RuntimeError('Invalid motor number')
        
        if speed < -MD4C_MOTOR_MAX_SPEED:
            speed = -MD4C_MOTOR_MAX_SPEED
        elif speed > MD4C_MOTOR_MAX_SPEED:
            speed = MD4C_MOTOR_MAX_SPEED
        
        if speed < 0:
            dir = 0
            speed = - speed
        else:
            dir = 1
        #data_test = [\x00, \x00, \x60]
        self._write(MD4C_REG_CH1+motor, pack('BB', dir, speed))
        #self._write(MD4C_REG_CH1+motor, data_test)
        if t != None:
            sleep(t)
            self.set_motor(motor,0)
    def set_motors(self, speed):
        
        if speed < -MD4C_MOTOR_MAX_SPEED:
            speed = -MD4C_MOTOR_MAX_SPEED
        elif speed > MD4C_MOTOR_MAX_SPEED:
            speed = MD4C_MOTOR_MAX_SPEED
        
        for i in range(4):
            self.set_motor(i, speed)

##########  I2C UTILITY  ########################################
    def _write(self, register, data):
        # Write 1 byte of data to the specified  register address.
        self._i2c.writeto_mem(self._addr, register, data)

    def _read(self, register, bytes=1):
        # Read and return a byte from  the specified register address.
        self._i2c.writeto(self._addr, bytes([register]))
        result = self._i2c.readfrom(self._addr, bytes)
        return result[0]
