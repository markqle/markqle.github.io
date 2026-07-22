---
title: 'PCOS Diagnosis with Deep Learning'
description: 'A multimodal deep learning study for Polycystic Ovary Syndrome (PCOS) diagnosis, combining classical ML and neural networks on clinical tabular data with a CNN on ovarian ultrasound images.'
tech: ['Python', 'PyTorch', 'TensorFlow', 'Scikit-learn', 'CNN', 'XGBoost']
links:
  - label: 'Kaggle Notebook'
    url: 'https://www.kaggle.com/code/markle/pcos-deeplearning'
  - label: 'Report (PDF)'
    url: '/pcos-report.pdf'
  - label: 'Presentation'
    url: 'https://canva.link/qprabdphg7srgs7'
featured: true
order: 2
---

A graduate project for *IS 675 – Deep Learning for Business* at CSU Long Beach
(with Bruna Costa and Garrett Book), tackling **PCOS diagnosis** from two very
different data sources and asking which modeling approach a clinic could actually
trust.

**Approach**

Following the CRISP-DM framework, we modeled two datasets in parallel:

- **Clinical tabular data** — classical ML (Logistic Regression, Gradient
  Boosting, XGBoost) alongside a neural-network MLP, tuned with a *recall-first*
  threshold policy so the screening model minimizes missed PCOS cases.
- **Ovarian ultrasound images** — a convolutional neural network, compared
  against a classical pipeline using HOG feature extraction plus SVM.

**Results**

- The ultrasound **CNN reached ~99.6% test accuracy** (ROC-AUC up to 0.994),
  clearly outperforming the classical HOG + SVM baseline.
- On the clinical data, tuned models balanced the key clinical trade-off:
  Logistic Regression maximized PCOS recall, while Gradient Boosting and XGBoost
  gave the best F1 (~0.88), with ROC-AUC around 0.95.

We evaluated everything with precision, recall, F1, ROC-AUC, and confusion
matrices — emphasizing recall on the positive (PCOS) class, since in a screening
setting a false negative is far costlier than a false positive.
