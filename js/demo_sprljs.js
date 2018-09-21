// JavaScript Document

            var storageSize=0;//存储容量
            var diskGbSize = 0;//硬盘实际折算容量
            var machineDiskSize = 0;//每台设备满配实际可用容量
            var disk = 0;//所需视频存储硬盘数
            var dsaCount = 0;//DS-A设备数量
            /**
            *
            *计算所需存储容量
            *
            */
            function countSize(){
                var field = ['lineSum','kbps','hours','days'];
                for(var i=0;i < field.length;i++){
                    var fieldValue = document.getElementById(field[i]).value;
                    if(i == 0){
                        storageSize = fieldValue;
                    }else{
                        storageSize *= fieldValue;
                    }
                }
                storageSize = (storageSize*3600/8/1024/1024/1024);
                document.getElementById('size').value=storageSize.toFixed(2);
                countDisk();
                getDsaCount();
            }
            
            /**
            *
            *计算所需视频存储硬盘数
            *
            */
            function countDisk(){
                var fieldValue = document.getElementById('format').value;
                var val = storageSize/(1 - fieldValue/100)*1024/diskGbSize;
                disk = Math.ceil(val);
                document.getElementById('diskSum').value = disk;
                countMachineDiskSize();
            }
            
            /**
            *
            *计算硬盘实际折算容量
            *
            */
            function countGB(obj){
                var val = obj.value/1.024/1.024/1.024;
                diskGbSize = val;
                document.getElementById('diskSizeGB').value = diskGbSize.toFixed(2);
                countDisk();
                countMachineDiskSize();
            }
            
            /**
            *
            *计算每台设备满配实际可用容量
            *
            */
            function countMachineDiskSize(){
                var disk = document.getElementById('disk').value;
                var raidSum = document.getElementById('raidSum').value;
                var backupDisks = document.getElementById('backupDisks').value;
                var format = document.getElementById('format').value;
                var val = (disk - backupDisks - raidSum)*diskGbSize*(1 - format/100)/1024;
                machineDiskSize = val.toFixed(1);
                document.getElementById('machineDiskSize').value = machineDiskSize;
                getDsaCount();
            }
            
            /**
            *
            *计算需要DS-A设备数量
            *
            */
            function getDsaCount(){
                var val = storageSize/machineDiskSize;
                dsaCount = Math.ceil(val);
                document.getElementById('dsaCount').value = dsaCount;
                needDiskCount();
            }
            
            /**
            *
            *计算实际需要硬盘
            *
            */
            function needDiskCount(){
                var raidSum = document.getElementById('raidSum').value;
                var backupDisks = document.getElementById('backupDisks').value;
                var val = disk + raidSum* dsaCount + backupDisks* dsaCount;
                document.getElementById('needDiskCount').value = val;
            }