import csv

fil = open("bivarscat.csv", 'r')
read = csv.reader(fil)
data= list(read)

#rows removed
k = 0
#loop through all the data
print('total rows before: ',len(data))
#iterates rows starting from last row
print(data[0][24])
for i in range(len(data)-1,0, -1):
    #check through all 28 attributes
    
    
    #time conversion
    if(data[i][1] != ""):
        arr = data[i][1].split(":")
        data[i][1] = float(arr[0]+arr[1])*.001
         
        k+=1
    #borough conversion
    elif(data[i][2] == ""):
        
        del data[i]
        
        k+=1
    #zip
    if(data[i][3] !=""):
        data[i][3] = (float(data[i][3]) -10001)*.001
        k+=1
    #lat and long 40.50111, -74.2418 min, -73.7185 max
    if(data[i][4] != ""):
        
        data[i][4] = float(data[i][4]) -40.50111
         
        k+=1
          
    if(data[i][5] != ""):
        
        data[i][5] = float(data[i][5]) +74.2418
         
        k+=1
    #coordinates
    elif(data[i][6] == ""):
        
        del data[i]
         
        k+=1
    #on street
    elif(data[i][7] == ""):
        
        del data[i] 
         
        k+=1
    #no contributing factor 1, or unspecified contributing factors
    elif(data[i][18] == "" or data[i][18] == 'Unspecified'):
        
        del data[i]
         
        k+=1
    elif(data[i][19] =='Unspecified'):
    
        del data[i]
         
        k+=1
    elif(data[i][20] =='Unspecified'):
    
        del data[i]
         
        k+=1
    elif(data[i][21] =='Unspecified'):
    
        del data[i]
         
        k+=1
    elif(data[i][22] =='Unspecified'):
    
        del data[i]
         
        k+=1
    #no vehicle type 1, 2 or 3. Filters out small crashes
    elif(data[i][24] == "" ):
        
        del data[i]
         
        k+=1
        
    elif(data[i][25] == ""):
        
        del data[i]
         
        k+=1
    elif(data[i][26] == ""):
        
        del data[i]
         
        k+=1
print ('total rows removed: ',k) #print amount of rows removed       
print('total rows after: ',len(data)) #print amount of rows      

#loop through the remaining data, output to a new csv
#writing out
fil = open("corclean.csv", "w")
writer = csv.writer(fil,lineterminator = '\n')
for i in data:
    writer.writerow(i)

print("Finished")