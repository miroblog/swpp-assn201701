import os

os.environ['KERAS_BACKEND'] = 'theano'

from sns_backend_rest.nsfw.model import nsfwDetectionModel

from keras import backend as K

K.set_image_dim_ordering('tf')

from PIL import Image
import numpy as np


class nsfwDetection():

    def __init__(self):
        self.model = nsfwDetectionModel()

    def predict(self, img):
        img = self.resize(img)

        np_img = np.asarray(img)
        np_img = np_img.reshape(1, 224, 224, 3)

        pred = self.model.predict(np_img)

        # result: 0 - not safe for work, 1 - safe for work
        # probability: probability of the result class
        result = np.argmax(pred)
        probability = np.max(pred)

        isSafe = True
        if (result==0):
            isSafe = False

        return isSafe, probability

    def resize(self, img):
        img = Image.open(img)

        if img.mode != 'RGB':
            bg = Image.new("RGB", img.size, (255,255,255))
            bg.paste(img, img)
            img = bg

        width = img.size[0]
        height = img.size[1]

        # crop the image to make square
        if width > height:
            img = img.crop(
                (
                    (width/2) - (height/2),
                    0,
                    (width/2) + (height/2),
                    height
                )
            )
        else:
            img = img.crop(
                (
                    0,
                    (height/2) - (width/2),
                    width,
                    (height/2) + (width/2)
                )
            )

        img = img.resize((224, 224), Image.ANTIALIAS)

        return img
