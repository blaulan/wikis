---
layout: default
parent: Academic
nav_order: 1
title: Machine Learning Starter
author: Yue Wu <me@blaulan.com>
created:  2020-08-18 21:43:40
modified: 2021-03-24 13:48:28
tags: [notes]
---

## Tensorflow and deep learning - without a PhD

[Video](https://www.youtube.com/watch?v=vq2nnJ4g6N0),
[Slides](https://docs.google.com/presentation/d/1TVixw6ItiZ8igjp6U17tcgoFrLSaHWQmMOwjlgQY9co/pub?slide=id.p),
[Blog Post](https://cloud.google.com/blog/big-data/2017/01/learn-tensorflow-and-deep-learning-without-a-phd),
[Github](https://github.com/martin-gorner/tensorflow-mnist-tutorial).

### Neural Network

- softmax
- cross entropy
- multiple layers
- sigmoid vs. relu (Rectified Linear Unit)
- learning rate decay
- dropout

### Convolutional Neural Network

- channels, padding, stride
- batch normalisation

### Recurrent Neural Network

[TODO]

### Proof of Concept

```python
# load mnist dataset
mnist = tf.contrib.learn.datasets.load_dataset('mnist')

# setup placeholders
X = tf.placeholder(tf.float32, [None, 784])
Y_ = tf.placeholder(tf.int32, [None])
step = tf.placeholder(tf.int32)
pkeep = tf.placeholder(tf.float32)

# configure parameters
cross_entropy = -tf.reduce_sum(tf.one_hot(Y_, 10) * tf.log(Y))
is_correct = tf.equal(tf.argmax(Y, 1, output_type=tf.int32), Y_)
accuracy = tf.reduce_mean(tf.cast(is_correct, tf.float32))
lr = 0.0001 + tf.train.exponential_decay(0.003, step, 2000, 1/math.e)
optimizer = tf.train.GradientDescentOptimizer(lr)
train_step = optimizer.minimize(cross_entropy)

# run the training process
init = tf.global_variables_initializer()
sess = tf.Session()
sess.run(init)
results = []
for i in range(1000):
    batch_X, batch_Y = mnist.train.next_batch(100)
    sess.run(train_step, feed_dict={
        X: batch_X, Y_: batch_Y, pkeep: 0.75, step: i
    })
    if not i % 20:
        results.append(sess.run([accuracy, cross_entropy], feed_dict={
            X: mnist.test.images, Y_: mnist.test.labels, pkeep: 1.00
        }))

# show training process
r = pd.DataFrame(results, columns=['accuracy', 'cross_entropy'])
r.plot(subplots=True, layout=(1, 2))
```

## Server Side Config [^1]

```bash
# download pre-built Apache Spark
sudo apt-get -y install default-jre default-jdk
wget http://apache.claz.org/spark/spark-2.3.0/spark-2.3.0-bin-hadoop2.7.tgz
tar -zxf spark-2.3.0-bin-hadoop2.7.tgz
wget http://apache.mirrors.pair.com/hadoop/common/hadoop-3.1.0/hadoop-3.1.0.tar.gz
tar -zxf hadoop-3.1.0.tar.gz

# install R, R Studio Server [8787]
# sudo apt-get -y install r-base gdebi-core
# wget https://download2.rstudio.org/rstudio-server-0.99.903-amd64.deb
# sudo gdebi rstudio-server-0.99.903-amd64.deb

# install python scientific packages
pip3 install scipy scikit-learn pyspark tensorflow 
pip3 install octave_kernel
```

## References

[^1]: [Server Basic Conf](/wiki/server/server_basic/)
