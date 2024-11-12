import re
import pickle
import numpy as np
from sklearn.datasets import load_wine
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
import pandas as pd



def predict_pipeline(alcohol, malic_acid, ash, alcalinity_of_ash):
    return predict(alcohol, malic_acid, ash, alcalinity_of_ash)


def predict(alcohol, malic_acid, ash, alcalinity_of_ash):

    wine = load_wine()
    wine_df = pd.DataFrame(data=wine.data[:, :4], columns=wine.feature_names[:4])
    wine_df['target'] = wine.target

    # Separate features and target variable
    X = wine_df.drop('target', axis=1)
    y = wine_df['target']

    # Split data into training and testing sets
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    # Initialize and train the logistic regression model
    model = LogisticRegression(max_iter=200)
    model.fit(X_train, y_train)

    # Make predictions
    y_pred = model.predict(np.array([[alcohol, malic_acid, ash, alcalinity_of_ash]]))

    if y_pred[0]==0:
        return "1st variety"
    if y_pred[0]==1:
        return "2nd variety"
    else:        
        return "3rd variety"


if __name__=="__main__":
    predictions = predict_pipeline(text)
    print(predictions)