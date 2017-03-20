import pandas as pd
df = pd.read_csv("orderedscatcleaned.csv",header=None,sep=',')

df.columns=['Pers K','Pers i','Mot i','Mot K','Zip','Long','Lat','Ped i','Time','Cyc i']
df.tail()