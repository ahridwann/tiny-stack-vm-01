import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
import{join}from'node:path';
function R(p,q){
let D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),w=new Uint8Array(65536),s=0,c=0,l=0,i=0,x=0,t=0;
let e=n=>({out:w.slice(0,l),code:n});
for(;;){
if(t==1e6)return e(10);
if(x<0||x>=p.length)return e(9);
let k=p[x],m=k<8?k==1?1:k==2?4:0:k>15&&k<35?0:k>47&&k<52?2:k==52||k>63&&k<66||k>79&&k<84?0:-1;
if(m<0)return e(5);
if(x+m>=p.length)return e(9);
t++;
let n=x+1+m,u,v;
if(k<8){u=[0,0,0,1,1,2,2,3][k];v=[0,1,1,0,2,2,3,3][k]}
else if(k<35){u=k==23||k==27?1:2;v=1}
else if(k<53){u=k==49||k==50?1:0;v=0}
else if(k<66){u=k==64?1:2;v=k==64?1:0}
else{u=k==82?0:1;v=k==82?1:0}
if(s<u)return e(2);
if(s-u+v>256)return e(3);
x=n;
if(k>15&&k<35&&k!=23&&k!=27){
let y=D[--s],a=D[s-1],r;
if(k==16)r=a+y|0;
else if(k==17)r=a-y|0;
else if(k==18)r=Math.imul(a,y);
else if(k==19){if(!y)return e(4);r=a/y|0}
else if(k==20){if(!y)return e(4);r=a%y|0}
else if(k==21){if(!y)return e(4);r=Math.floor((a>>>0)/(y>>>0))|0}
else if(k==22){if(!y)return e(4);r=(a>>>0)%(y>>>0)|0}
else if(k==24)r=a&y;
else if(k==25)r=a|y;
else if(k==26)r=a^y;
else if(k==28)r=a<<(y&31);
else if(k==29)r=a>>(y&31);
else if(k==30)r=(a>>>(y&31))|0;
else if(k==32)r=a==y?1:0;
else if(k==33)r=a<y?1:0;
else r=(a>>>0)<(y>>>0)?1:0;
D[s-1]=r;continue}
switch(k){
case 0:return e(0);
case 1:D[s++]=(p[x-1]<<24)>>24;break;
case 2:D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:{let z=D[s-1];D[s-1]=D[s-2];D[s-2]=z;break}
case 6:D[s]=D[s-2];s++;break;
case 7:{let a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break}
case 23:D[s-1]=-D[s-1]|0;break;
case 27:D[s-1]=~D[s-1];break;
case 48:case 49:case 50:{let r=(p[x-2]|p[x-1]<<8)<<16>>16,f=1;if(k!=48){let g=D[--s];f=k==49?g==0:g!=0}if(f)x+=r;break}
case 51:if(c==64)return e(7);C[c++]=x;x=p[x-2]|p[x-1]<<8;break;
case 52:if(!c)return e(8);x=C[--c];break;
case 64:{let a=D[s-1];if(a<0||a>255)return e(6);D[s-1]=M[a];break}
case 65:{let a=D[s-1],v=D[s-2];if(a<0||a>255)return e(6);s-=2;M[a]=v;break}
case 80:{let g=String(D[s-1]);if(l+g.length>65536)return e(11);s--;for(let j=0;j<g.length;j++)w[l++]=g.charCodeAt(j);break}
case 81:if(l+1>65536)return e(11);w[l++]=D[--s]&255;break;
case 82:D[s++]=i<q.length?q[i++]:-1;break;
case 83:return e(D[--s]&255)}}}
let I=process.env.MAKEFUN_INPUT_DIR||'/input',O=process.env.MAKEFUN_OUTPUT_DIR||'/output';
for(let d of readdirSync(I).sort()){let r=R(readFileSync(join(I,d,'program.bin')),readFileSync(join(I,d,'input.bin')));mkdirSync(join(O,d),{recursive:true});writeFileSync(join(O,d,'stdout.bin'),r.out);writeFileSync(join(O,d,'exit.txt'),r.code+'\n')}
