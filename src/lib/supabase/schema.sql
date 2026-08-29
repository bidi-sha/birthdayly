alter table birthdays add column if not exists category text default 'All';
alter table birthdays add column if not exists notes text;