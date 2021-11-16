select *
from region_1 
where lv = 0;

## 일단 lv은 나두고, 
## lv 0 : 1depth
## lv 1 : 2depth(구까지)
## lv 2 : 읍면동
## lv 3 : 리


## 부산 중구 찾기
explain
select *
from region_1 
where name like "%중구%" 
;


## 부산 중구 한개의 depth 더
explain
select *
from region_1 
where name like "%중구%"
and lv = 1
;

select *
from region_1 
where name like "%중구%"
and lv = 1
;

explain
select *
from region
where name like "%중구%"
and lv = 1
and parent = 11
;


select *
from region_1
where lv = 2
;


select *
from region 
where id_key = 111
;

## 부산 중구 영주동 찾기. 
select *
from region_1 
where lv = 2
and name like "%영주동"
and parent = concat(
				select name 
			)
;

select *
from region_1 a
inner join region_1 b
on a.id_key  = b.parent
;


select *
from region a
inner join region b
on a.id_key  = b.parent
where b.name like "%영주동%"
and b.lv = 2
and a.parent = (select id_key from region where lv=0 and name like "%부산%")
;

select id_key, name
from region
where name like "부산%"
and lv = 0 
;





