from __future__ import division, print_function
import numpy as np
import os

os.environ['KERAS_BACKEND'] = 'theano'

from keras.applications.resnet50 import ResNet50
from keras.layers import Dense, GlobalAveragePooling2D
from keras.models import Model


class nsfwDetectionModel(object):
    model = None
    size = (224, 224)   # image input size
    weights_path = "sns_backend_rest/nsfw/resnet50_transfer.h5"

    def __init__(self):
        self.create(self.size)

    def load_weights(self, by_name=False):
        model = self.model
        model.load_weights(self.weights_path, by_name)

    def create(self, size):
        """
        :param size: image size
        """
        shape = size + (3,)

        base_model = ResNet50(weights=None, include_top=False, input_shape=shape)

        x = base_model.output
        x = GlobalAveragePooling2D()(x)
        predictions = Dense(2, activation='softmax')(x)

        self.model = Model(inputs=base_model.input, outputs=predictions)

        self.load_weights()


    def predict(self, img):
        """
        주어진 이미지에 대한 prediction 결과를 반환합니다.
        :param img: a image
        :return pred: prediction result [probability of nsfw, probability of sfw]
        """
        pred = self.model.predict(img, batch_size=1)
        return pred
