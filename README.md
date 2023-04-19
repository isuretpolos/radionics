# radionics
Online Radionics for everyone

**WELCOME TO AETHERONEPI ONLINE**

![alt text](ui/src/assets/images/radionics1.jpg "Title")

## Build
````shell
 ng build --base-href radionics
````
Always include the copyright. Do not remove it, else it is an infringement of the License.
```qute
Copyright Isuret Polos 2023
```

# Preparing the quantum jump in radionics
I thought that a radionic script would be excellent, one that can be interpretet by an engine for analysis and broadcasting, like the AetherOnePi or in this case the Radionics Online version of the AetherOnePi.

## Radionic Script
### Check the General Vitality 
````
PET_GV = CHECK GV
PRINT PET_GV
````
Results in ...
````
CHECKING GV FOR PET_GV
PET_GV = 454
````

### Analyze
````
PET_ANALYSIS = ANALYZE HOMEOPATHY_CLARKE
PRINT PET_ANALYSIS
````
Results in ...
````
-------------------------------------
PET_ANALYSIS
Energetic | GV    | Rate / Signature | Potency
1005      | 1020  | Pulsatilla       | C200
930       | 129   | Lycopodium       | D1
452       | 277   | Silicea          | LM 5
-------------------------------------  
```` 

### Broadcast
````
SET MAX_GV = PET_GV
BROADCAST PET_ANALYSIS
````
The broadcast would automatically broadcast all rates inside the PET_ANALYSIS that are higher than the current PET_GV. In this case it would broadcast only Pulsatilla.

The result of the analysis, or the protocol, can be retrieved using the command PRINT.

### PRINT Command
````
PRINT PET_ANALYSIS
PRINT PET_GV
PRINT "Script Pet Analysis finished!"
````
Results in ...
````
-------------------------------------
PET_ANALYSIS
Energetic | GV    | Rate / Signature
1005      | 1020  | Pulsatilla       | C200
930       | 129   | Lycopodium       | D1
452       | 277   | Silicea          | LM 5
-------------------------------------
DATE/TIME | NAME OR RATE    | COUNTERCHECK
22:59:01  | Pulsatilla C200 | 450
23:02:11  | Pulsatilla C200 | 900
-------------------------------------
Script Pet Analysis finished!
````

With time we recognize more useful commands and I will implement them in the Radionics Online software, maybe even in the offline software AetherOnePi.

## Disclaimer
This software is provided "as is" and without any warranty or representation, whether express, implied or statutory. The creator and owner of this software and the information does not make any guarantees or claims as to the accuracy, reliability, suitability, availability or completeness of the software or any information contained within it. The creator and owner of this software shall not be liable for any damages or injury, including but not limited to, direct, indirect, incidental, special, consequential or exemplary damages, arising from the use or inability to use the software or any information contained within it. The user assumes full responsibility for using the software and any consequences that may arise from such use. This software is not intended to replace or substitute for any professional medical advice, diagnosis or treatment. The user is advised to seek professional medical advice before using the software for any medical purposes. By using this software, the user agrees to indemnify and hold harmless the creator and owner of the software from any claims, demands, actions or damages arising from the use of the software or any information contained within it.

I do not provide medical health service or any kind of service. This is my own experiment put online. Whoever wants to play with it, you are welcome. Do not use it as replacement for a doctor if you need medical attention. Your health is your own responsibility, not mine!
 
