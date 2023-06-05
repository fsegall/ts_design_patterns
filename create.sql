drop schema techcompany cascade;

create schema techcompany;

create table techcompany.contract (
    id_contract uuid not null default uuid_generate_v4() primary key,
    description text,
    amount numeric,
    period integer,
    date timestamp
);

create table techcompany.payment (
    id_payment uuid not null default uuid_generate_v4() primary key,
    id_contract uuid references techcompany.contract (id_contract),
    amount numeric,
    date timestamp
);

insert into techcompany.contract values ('7d433075-f01c-4d11-a7e2-293b50c9f808', 'Prestação de serviços escolares', 6000, 12, '2023-01-01T10:00:00');

insert into techcompany.payment values ('094bfa3b-2be5-499a-a59b-3ad438103301', '7d433075-f01c-4d11-a7e2-293b50c9f808', 6000, '2023-01-05T10:00:00');