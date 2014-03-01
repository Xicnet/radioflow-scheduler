--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: ajax_upload_uploadedfile; Type: TABLE; Schema: public; Owner: rna; Tablespace: 
--

CREATE TABLE ajax_upload_uploadedfile (
    id integer NOT NULL,
    creation_date timestamp with time zone NOT NULL,
    file character varying(255) NOT NULL
);


ALTER TABLE public.ajax_upload_uploadedfile OWNER TO rna;

--
-- Name: ajax_upload_uploadedfile_id_seq; Type: SEQUENCE; Schema: public; Owner: rna
--

CREATE SEQUENCE ajax_upload_uploadedfile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ajax_upload_uploadedfile_id_seq OWNER TO rna;

--
-- Name: ajax_upload_uploadedfile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rna
--

ALTER SEQUENCE ajax_upload_uploadedfile_id_seq OWNED BY ajax_upload_uploadedfile.id;


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: rna; Tablespace: 
--

CREATE TABLE auth_group (
    id integer NOT NULL,
    name character varying(80) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO rna;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: rna
--

CREATE SEQUENCE auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO rna;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rna
--

ALTER SEQUENCE auth_group_id_seq OWNED BY auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: rna; Tablespace: 
--

CREATE TABLE auth_group_permissions (
    id integer NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO rna;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: rna
--

CREATE SEQUENCE auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO rna;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rna
--

ALTER SEQUENCE auth_group_permissions_id_seq OWNED BY auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: rna; Tablespace: 
--

CREATE TABLE auth_permission (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO rna;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: rna
--

CREATE SEQUENCE auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO rna;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rna
--

ALTER SEQUENCE auth_permission_id_seq OWNED BY auth_permission.id;


--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: rna; Tablespace: 
--

CREATE TABLE auth_user (
    id integer NOT NULL,
    username character varying(30) NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    email character varying(75) NOT NULL,
    password character varying(128) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    is_superuser boolean NOT NULL,
    last_login timestamp with time zone NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


ALTER TABLE public.auth_user OWNER TO rna;

--
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: rna; Tablespace: 
--

CREATE TABLE auth_user_groups (
    id integer NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.auth_user_groups OWNER TO rna;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: rna
--

CREATE SEQUENCE auth_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_groups_id_seq OWNER TO rna;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rna
--

ALTER SEQUENCE auth_user_groups_id_seq OWNED BY auth_user_groups.id;


--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: rna
--

CREATE SEQUENCE auth_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_id_seq OWNER TO rna;

--
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rna
--

ALTER SEQUENCE auth_user_id_seq OWNED BY auth_user.id;


--
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: rna; Tablespace: 
--

CREATE TABLE auth_user_user_permissions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_user_user_permissions OWNER TO rna;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: rna
--

CREATE SEQUENCE auth_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_user_permissions_id_seq OWNER TO rna;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rna
--

ALTER SEQUENCE auth_user_user_permissions_id_seq OWNED BY auth_user_user_permissions.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: rna; Tablespace: 
--

CREATE TABLE django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    user_id integer NOT NULL,
    content_type_id integer,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO rna;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: rna
--

CREATE SEQUENCE django_admin_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO rna;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rna
--

ALTER SEQUENCE django_admin_log_id_seq OWNED BY django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: rna; Tablespace: 
--

CREATE TABLE django_content_type (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO rna;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: rna
--

CREATE SEQUENCE django_content_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO rna;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rna
--

ALTER SEQUENCE django_content_type_id_seq OWNED BY django_content_type.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: rna; Tablespace: 
--

CREATE TABLE django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO rna;

--
-- Name: django_site; Type: TABLE; Schema: public; Owner: rna; Tablespace: 
--

CREATE TABLE django_site (
    id integer NOT NULL,
    domain character varying(100) NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.django_site OWNER TO rna;

--
-- Name: django_site_id_seq; Type: SEQUENCE; Schema: public; Owner: rna
--

CREATE SEQUENCE django_site_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_site_id_seq OWNER TO rna;

--
-- Name: django_site_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rna
--

ALTER SEQUENCE django_site_id_seq OWNED BY django_site.id;


--
-- Name: easy_thumbnails_source; Type: TABLE; Schema: public; Owner: rna; Tablespace: 
--

CREATE TABLE easy_thumbnails_source (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    modified timestamp with time zone NOT NULL,
    storage_hash character varying(40) NOT NULL
);


ALTER TABLE public.easy_thumbnails_source OWNER TO rna;

--
-- Name: easy_thumbnails_source_id_seq; Type: SEQUENCE; Schema: public; Owner: rna
--

CREATE SEQUENCE easy_thumbnails_source_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.easy_thumbnails_source_id_seq OWNER TO rna;

--
-- Name: easy_thumbnails_source_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rna
--

ALTER SEQUENCE easy_thumbnails_source_id_seq OWNED BY easy_thumbnails_source.id;


--
-- Name: easy_thumbnails_thumbnail; Type: TABLE; Schema: public; Owner: rna; Tablespace: 
--

CREATE TABLE easy_thumbnails_thumbnail (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    modified timestamp with time zone NOT NULL,
    source_id integer NOT NULL,
    storage_hash character varying(40) NOT NULL
);


ALTER TABLE public.easy_thumbnails_thumbnail OWNER TO rna;

--
-- Name: easy_thumbnails_thumbnail_id_seq; Type: SEQUENCE; Schema: public; Owner: rna
--

CREATE SEQUENCE easy_thumbnails_thumbnail_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.easy_thumbnails_thumbnail_id_seq OWNER TO rna;

--
-- Name: easy_thumbnails_thumbnail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rna
--

ALTER SEQUENCE easy_thumbnails_thumbnail_id_seq OWNED BY easy_thumbnails_thumbnail.id;


--
-- Name: registration_registrationprofile; Type: TABLE; Schema: public; Owner: rna; Tablespace: 
--

CREATE TABLE registration_registrationprofile (
    id integer NOT NULL,
    user_id integer NOT NULL,
    activation_key character varying(40) NOT NULL
);


ALTER TABLE public.registration_registrationprofile OWNER TO rna;

--
-- Name: registration_registrationprofile_id_seq; Type: SEQUENCE; Schema: public; Owner: rna
--

CREATE SEQUENCE registration_registrationprofile_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registration_registrationprofile_id_seq OWNER TO rna;

--
-- Name: registration_registrationprofile_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rna
--

ALTER SEQUENCE registration_registrationprofile_id_seq OWNED BY registration_registrationprofile.id;


--
-- Name: south_migrationhistory; Type: TABLE; Schema: public; Owner: rna; Tablespace: 
--

CREATE TABLE south_migrationhistory (
    id integer NOT NULL,
    app_name character varying(255) NOT NULL,
    migration character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.south_migrationhistory OWNER TO rna;

--
-- Name: south_migrationhistory_id_seq; Type: SEQUENCE; Schema: public; Owner: rna
--

CREATE SEQUENCE south_migrationhistory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.south_migrationhistory_id_seq OWNER TO rna;

--
-- Name: south_migrationhistory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rna
--

ALTER SEQUENCE south_migrationhistory_id_seq OWNED BY south_migrationhistory.id;


--
-- Name: timeslot_config; Type: TABLE; Schema: public; Owner: rna; Tablespace: 
--

CREATE TABLE timeslot_config (
    id integer NOT NULL,
    streamurl character varying(512) NOT NULL,
    image character varying(100),
    cropping character varying(255) NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.timeslot_config OWNER TO rna;

--
-- Name: timeslot_config_id_seq; Type: SEQUENCE; Schema: public; Owner: rna
--

CREATE SEQUENCE timeslot_config_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.timeslot_config_id_seq OWNER TO rna;

--
-- Name: timeslot_config_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rna
--

ALTER SEQUENCE timeslot_config_id_seq OWNED BY timeslot_config.id;


--
-- Name: timeslot_day; Type: TABLE; Schema: public; Owner: rna; Tablespace: 
--

CREATE TABLE timeslot_day (
    id integer NOT NULL,
    name character varying(10) NOT NULL
);


ALTER TABLE public.timeslot_day OWNER TO rna;

--
-- Name: timeslot_day_id_seq; Type: SEQUENCE; Schema: public; Owner: rna
--

CREATE SEQUENCE timeslot_day_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.timeslot_day_id_seq OWNER TO rna;

--
-- Name: timeslot_day_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rna
--

ALTER SEQUENCE timeslot_day_id_seq OWNED BY timeslot_day.id;


--
-- Name: timeslot_program; Type: TABLE; Schema: public; Owner: rna; Tablespace: 
--

CREATE TABLE timeslot_program (
    id integer NOT NULL,
    name character varying(256) NOT NULL,
    description text,
    moderator character varying(1024),
    image character varying(100),
    cropping character varying(255) NOT NULL,
    start time without time zone,
    "end" time without time zone,
    created timestamp with time zone NOT NULL,
    user_id integer NOT NULL
);


ALTER TABLE public.timeslot_program OWNER TO rna;

--
-- Name: timeslot_program_days; Type: TABLE; Schema: public; Owner: rna; Tablespace: 
--

CREATE TABLE timeslot_program_days (
    id integer NOT NULL,
    program_id integer NOT NULL,
    day_id integer NOT NULL
);


ALTER TABLE public.timeslot_program_days OWNER TO rna;

--
-- Name: timeslot_program_days_id_seq; Type: SEQUENCE; Schema: public; Owner: rna
--

CREATE SEQUENCE timeslot_program_days_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.timeslot_program_days_id_seq OWNER TO rna;

--
-- Name: timeslot_program_days_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rna
--

ALTER SEQUENCE timeslot_program_days_id_seq OWNED BY timeslot_program_days.id;


--
-- Name: timeslot_program_id_seq; Type: SEQUENCE; Schema: public; Owner: rna
--

CREATE SEQUENCE timeslot_program_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.timeslot_program_id_seq OWNER TO rna;

--
-- Name: timeslot_program_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: rna
--

ALTER SEQUENCE timeslot_program_id_seq OWNED BY timeslot_program.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rna
--

ALTER TABLE ONLY ajax_upload_uploadedfile ALTER COLUMN id SET DEFAULT nextval('ajax_upload_uploadedfile_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rna
--

ALTER TABLE ONLY auth_group ALTER COLUMN id SET DEFAULT nextval('auth_group_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rna
--

ALTER TABLE ONLY auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('auth_group_permissions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rna
--

ALTER TABLE ONLY auth_permission ALTER COLUMN id SET DEFAULT nextval('auth_permission_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rna
--

ALTER TABLE ONLY auth_user ALTER COLUMN id SET DEFAULT nextval('auth_user_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rna
--

ALTER TABLE ONLY auth_user_groups ALTER COLUMN id SET DEFAULT nextval('auth_user_groups_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rna
--

ALTER TABLE ONLY auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('auth_user_user_permissions_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rna
--

ALTER TABLE ONLY django_admin_log ALTER COLUMN id SET DEFAULT nextval('django_admin_log_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rna
--

ALTER TABLE ONLY django_content_type ALTER COLUMN id SET DEFAULT nextval('django_content_type_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rna
--

ALTER TABLE ONLY django_site ALTER COLUMN id SET DEFAULT nextval('django_site_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rna
--

ALTER TABLE ONLY easy_thumbnails_source ALTER COLUMN id SET DEFAULT nextval('easy_thumbnails_source_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rna
--

ALTER TABLE ONLY easy_thumbnails_thumbnail ALTER COLUMN id SET DEFAULT nextval('easy_thumbnails_thumbnail_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rna
--

ALTER TABLE ONLY registration_registrationprofile ALTER COLUMN id SET DEFAULT nextval('registration_registrationprofile_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rna
--

ALTER TABLE ONLY south_migrationhistory ALTER COLUMN id SET DEFAULT nextval('south_migrationhistory_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rna
--

ALTER TABLE ONLY timeslot_config ALTER COLUMN id SET DEFAULT nextval('timeslot_config_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rna
--

ALTER TABLE ONLY timeslot_day ALTER COLUMN id SET DEFAULT nextval('timeslot_day_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rna
--

ALTER TABLE ONLY timeslot_program ALTER COLUMN id SET DEFAULT nextval('timeslot_program_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: rna
--

ALTER TABLE ONLY timeslot_program_days ALTER COLUMN id SET DEFAULT nextval('timeslot_program_days_id_seq'::regclass);


--
-- Data for Name: ajax_upload_uploadedfile; Type: TABLE DATA; Schema: public; Owner: rna
--

COPY ajax_upload_uploadedfile (id, creation_date, file) FROM stdin;
\.


--
-- Name: ajax_upload_uploadedfile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rna
--

SELECT pg_catalog.setval('ajax_upload_uploadedfile_id_seq', 1, false);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: rna
--

COPY auth_group (id, name) FROM stdin;
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rna
--

SELECT pg_catalog.setval('auth_group_id_seq', 1, false);


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: rna
--

COPY auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rna
--

SELECT pg_catalog.setval('auth_group_permissions_id_seq', 1, false);


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: rna
--

COPY auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add permission	1	add_permission
2	Can change permission	1	change_permission
3	Can delete permission	1	delete_permission
4	Can add group	2	add_group
5	Can change group	2	change_group
6	Can delete group	2	delete_group
7	Can add user	3	add_user
8	Can change user	3	change_user
9	Can delete user	3	delete_user
10	Can add content type	4	add_contenttype
11	Can change content type	4	change_contenttype
12	Can delete content type	4	delete_contenttype
13	Can add session	5	add_session
14	Can change session	5	change_session
15	Can delete session	5	delete_session
16	Can add site	6	add_site
17	Can change site	6	change_site
18	Can delete site	6	delete_site
19	Can add log entry	7	add_logentry
20	Can change log entry	7	change_logentry
21	Can delete log entry	7	delete_logentry
22	Can add registration profile	8	add_registrationprofile
23	Can change registration profile	8	change_registrationprofile
24	Can delete registration profile	8	delete_registrationprofile
25	Can add uploaded file	9	add_uploadedfile
26	Can change uploaded file	9	change_uploadedfile
27	Can delete uploaded file	9	delete_uploadedfile
28	Can add migration history	10	add_migrationhistory
29	Can change migration history	10	change_migrationhistory
30	Can delete migration history	10	delete_migrationhistory
31	Can add day	11	add_day
32	Can change day	11	change_day
33	Can delete day	11	delete_day
34	Can add program	12	add_program
35	Can change program	12	change_program
36	Can delete program	12	delete_program
37	Can add config	13	add_config
38	Can change config	13	change_config
39	Can delete config	13	delete_config
40	Can add source	14	add_source
41	Can change source	14	change_source
42	Can delete source	14	delete_source
43	Can add thumbnail	15	add_thumbnail
44	Can change thumbnail	15	change_thumbnail
45	Can delete thumbnail	15	delete_thumbnail
\.


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rna
--

SELECT pg_catalog.setval('auth_permission_id_seq', 45, true);


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: rna
--

COPY auth_user (id, username, first_name, last_name, email, password, is_staff, is_active, is_superuser, last_login, date_joined) FROM stdin;
4	rae	RAE			pbkdf2_sha256$10000$Q8k12jKJ1faQ$mM8Z1DUh/czV+F5OBnn4L6NZCRB4WUNnYNZtdTQOP9Q=	f	t	f	2014-02-26 11:36:06.822-03	2013-12-06 12:55:34-03
3	nacionalclasica	Nacional Clásica			pbkdf2_sha256$10000$pBQZgHtsZ6mE$HJq4Q+iH4fT5tN7R2bawkGbARiUMOxj7S2GE0SI1q7Q=	f	t	f	2014-02-19 09:56:05.687-03	2013-12-06 12:55:02-03
5	radionacionalam870	Radionacional AM870			pbkdf2_sha256$10000$ykHDTM8HCPmB$WDgI1O116Ae+iI0jhzR1/TGrqVZAURzErswwpmL1XRU=	f	t	f	2014-02-20 09:30:51.534-03	2013-12-06 12:56:34-03
2	nacionalfolklorica				pbkdf2_sha256$10000$4qxKbJQWzFkV$cq8YkxsI7pBPW7EYxC+fzns5FOvowYe1Z8j4Z0MacWw=	t	t	f	2014-02-20 15:44:00.853-03	2013-12-06 00:36:33-03
1	nacionalrock	Nacional Rock		rama@xicnet.com	pbkdf2_sha256$10000$du0QwWC9zYbN$2ka2WhIelRrVYTnk6JR1rKlJS+A14SdoniTywyeG36U=	t	t	t	2014-03-01 09:08:05.23837-03	2013-12-04 16:52:49-03
6	radiodesalon				pbkdf2_sha256$10000$tLPotdLCC4Eb$o5JfjVGgZZQ867QVxFRKsuMqAQeGOzycSeQl0yb78gA=	t	t	f	2014-03-01 09:10:48.613449-03	2014-02-27 13:19:29-03
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: rna
--

COPY auth_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rna
--

SELECT pg_catalog.setval('auth_user_groups_id_seq', 1, false);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rna
--

SELECT pg_catalog.setval('auth_user_id_seq', 6, true);


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: rna
--

COPY auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
1	4	33
2	4	32
3	4	31
4	3	33
5	3	32
6	3	31
7	5	33
8	5	32
9	5	31
10	2	25
11	2	26
12	2	27
13	6	34
14	6	35
15	6	36
\.


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rna
--

SELECT pg_catalog.setval('auth_user_user_permissions_id_seq', 15, true);


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: rna
--

COPY django_admin_log (id, action_time, user_id, content_type_id, object_id, object_repr, action_flag, change_message) FROM stdin;
1	2014-02-27 13:19:29.432151-03	1	3	6	radiodesalon	1	
2	2014-02-27 13:19:53.959396-03	1	3	6	radiodesalon	2	Modifica password, is_staff y user_permissions.
3	2014-03-01 09:09:14.826076-03	1	12	149	Contra	2	Modifica cropping.
4	2014-03-01 09:09:28.682996-03	1	12	149	Contra	2	Modifica image.
\.


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rna
--

SELECT pg_catalog.setval('django_admin_log_id_seq', 4, true);


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: rna
--

COPY django_content_type (id, name, app_label, model) FROM stdin;
1	permission	auth	permission
2	group	auth	group
3	user	auth	user
4	content type	contenttypes	contenttype
5	session	sessions	session
6	site	sites	site
7	log entry	admin	logentry
8	registration profile	registration	registrationprofile
9	uploaded file	ajax_upload	uploadedfile
10	migration history	south	migrationhistory
11	day	timeslot	day
12	program	timeslot	program
13	config	timeslot	config
14	source	easy_thumbnails	source
15	thumbnail	easy_thumbnails	thumbnail
\.


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rna
--

SELECT pg_catalog.setval('django_content_type_id_seq', 15, true);


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: rna
--

COPY django_session (session_key, session_data, expire_date) FROM stdin;
afd63253558ac65b6e6ced8476469700	ZDMwN2Q1NTc1ODYxYWQxZDAzMmEwOWRlYmEwOWU0MmU4YTkxMTA3YzqAAn1xAS4=\n	2014-03-13 11:58:06.776224-03
a78fb16f994c603c475a85b6073318bd	NmY2MmNlZWRhYjlmZGViNmE5MDljZDZhOGZjM2MwMjg3OTcwYmZjYTqAAn1xAShVEl9hdXRoX3Vz\nZXJfYmFja2VuZHECVSlkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZHED\nVQ1fYXV0aF91c2VyX2lkcQRLBnUu\n	2014-03-15 09:10:48.622207-03
\.


--
-- Data for Name: django_site; Type: TABLE DATA; Schema: public; Owner: rna
--

COPY django_site (id, domain, name) FROM stdin;
1	xere:8000	xere
\.


--
-- Name: django_site_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rna
--

SELECT pg_catalog.setval('django_site_id_seq', 1, true);


--
-- Data for Name: easy_thumbnails_source; Type: TABLE DATA; Schema: public; Owner: rna
--

COPY easy_thumbnails_source (id, name, modified, storage_hash) FROM stdin;
1	uploaded_images/ramonymous_2.jpg	2014-03-01 04:13:48.404985-03	f9bde26a1556cd667f742bd34ec7c55e
\.


--
-- Name: easy_thumbnails_source_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rna
--

SELECT pg_catalog.setval('easy_thumbnails_source_id_seq', 1, true);


--
-- Data for Name: easy_thumbnails_thumbnail; Type: TABLE DATA; Schema: public; Owner: rna
--

COPY easy_thumbnails_thumbnail (id, name, modified, source_id, storage_hash) FROM stdin;
1	uploaded_images/ramonymous_2.jpg.300x300_q85_detail.jpg	2014-03-01 09:08:13.445197-03	1	d26becbf46ac48eda79c7a39a13a02dd
\.


--
-- Name: easy_thumbnails_thumbnail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rna
--

SELECT pg_catalog.setval('easy_thumbnails_thumbnail_id_seq', 1, true);


--
-- Data for Name: registration_registrationprofile; Type: TABLE DATA; Schema: public; Owner: rna
--

COPY registration_registrationprofile (id, user_id, activation_key) FROM stdin;
\.


--
-- Name: registration_registrationprofile_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rna
--

SELECT pg_catalog.setval('registration_registrationprofile_id_seq', 1, false);


--
-- Data for Name: south_migrationhistory; Type: TABLE DATA; Schema: public; Owner: rna
--

COPY south_migrationhistory (id, app_name, migration, applied) FROM stdin;
1	timeslot	0001_initial	2014-02-27 11:57:05.323766-03
2	timeslot	0002_auto__add_field_program_user	2014-02-27 11:57:05.456849-03
3	timeslot	0003_auto__chg_field_program_moderator	2014-02-27 11:57:05.583941-03
4	timeslot	0004_auto__add_config	2014-02-27 11:57:05.700615-03
5	easy_thumbnails	0001_initial	2014-02-27 11:57:06.028617-03
6	easy_thumbnails	0002_filename_indexes	2014-02-27 11:57:06.129469-03
7	easy_thumbnails	0003_auto__add_storagenew	2014-02-27 11:57:06.263781-03
8	easy_thumbnails	0004_auto__add_field_source_storage_new__add_field_thumbnail_storage_new	2014-02-27 11:57:06.355889-03
9	easy_thumbnails	0005_storage_fks_null	2014-02-27 11:57:06.549599-03
10	easy_thumbnails	0006_copy_storage	2014-02-27 11:57:06.567559-03
11	easy_thumbnails	0007_storagenew_fks_not_null	2014-02-27 11:57:06.710885-03
12	easy_thumbnails	0008_auto__del_field_source_storage__del_field_thumbnail_storage	2014-02-27 11:57:06.726771-03
13	easy_thumbnails	0009_auto__del_storage	2014-02-27 11:57:06.741741-03
14	easy_thumbnails	0010_rename_storage	2014-02-27 11:57:06.761778-03
15	easy_thumbnails	0011_auto__add_field_source_storage_hash__add_field_thumbnail_storage_hash	2014-02-27 11:57:07.009477-03
16	easy_thumbnails	0012_build_storage_hashes	2014-02-27 11:57:07.025238-03
17	easy_thumbnails	0013_auto__del_storage__del_field_source_storage__del_field_thumbnail_stora	2014-02-27 11:57:07.101427-03
18	easy_thumbnails	0014_auto__add_unique_source_name_storage_hash__add_unique_thumbnail_name_s	2014-02-27 11:57:07.177181-03
19	easy_thumbnails	0015_auto__del_unique_thumbnail_name_storage_hash__add_unique_thumbnail_sou	2014-02-27 11:57:07.235523-03
20	django_extensions	0001_empty	2014-02-27 11:57:07.301277-03
\.


--
-- Name: south_migrationhistory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rna
--

SELECT pg_catalog.setval('south_migrationhistory_id_seq', 20, true);


--
-- Data for Name: timeslot_config; Type: TABLE DATA; Schema: public; Owner: rna
--

COPY timeslot_config (id, streamurl, image, cropping, user_id) FROM stdin;
3	http://5.9.56.134:8146/;stream.nsv	uploaded_images/rae.jpg		4
4	http://5.9.56.134:8158/;stream.nsv	uploaded_images/nacionalfolklorica.jpg		2
5	http://5.9.56.134:8154/;stream.nsv	uploaded_images/nacionalclasica.jpg		3
2	http://5.9.56.134:8010/;stream.nsv	uploaded_images/radionacionalam870.jpg		5
6		uploaded_images/lightning-strike-thunder-bolt.jpg		6
1	http://streamlky.alsolnet.com:8270/sc_rad39	uploaded_images/hacklab01.jpg		1
\.


--
-- Name: timeslot_config_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rna
--

SELECT pg_catalog.setval('timeslot_config_id_seq', 6, true);


--
-- Data for Name: timeslot_day; Type: TABLE DATA; Schema: public; Owner: rna
--

COPY timeslot_day (id, name) FROM stdin;
1	Lunes
2	Martes
3	Miércoles
4	Jueves
5	Viernes
6	Sábado
7	Domingo
\.


--
-- Name: timeslot_day_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rna
--

SELECT pg_catalog.setval('timeslot_day_id_seq', 7, true);


--
-- Data for Name: timeslot_program; Type: TABLE DATA; Schema: public; Owner: rna
--

COPY timeslot_program (id, name, description, moderator, image, cropping, start, "end", created, user_id) FROM stdin;
16	Sucio Pop	Sucio Pop	Matías Castañeda y Tomás Balmaceda	uploaded_images/SUCIO-POP.jpg	119,0,202,124	16:00:00	18:00:00	2013-11-19 09:51:57-03	1
15	La hora pulenta	la hora pulenta	Nicolás Lantos y Juan Manuel Strassburger	uploaded_images/LA-HORA.jpg		14:00:00	16:00:00	2013-11-19 09:51:57-03	1
89	Hacklab a full	A hackearla	Rama	uploaded_images/hacklab01_6.jpg		08:00:00	12:00:00	2013-12-05 21:29:38.825-03	1
5	Casi Despierto	Casi Despierto	Pablo Marcovsky	uploaded_images/casi-despierto.jpg		07:00:00	10:00:00	2013-11-19 09:51:57-03	1
96	La gran aldea	Música por paises				11:00:00	12:00:00	2013-12-08 00:15:23.151-03	3
108	Té para dos		Donna Caroll y Oscar López Ruiz			18:00:00	20:00:00	2013-12-08 00:15:23.151-03	3
99	Asi de simple	Todos los estilos	Ricardo Salton	uploaded_images/Asi_De_Simple_-_Ricardo_Salton_01.JPG		18:00:00	20:00:00	2013-12-08 00:15:23.151-03	3
97	Clasicos a la carta	Giovanni Paisiello\nConcierto para mandolina, cuerdas y clave en Mi bemol mayor\nHugo Orlandi, mandolina\nI Solisti Veneti / Claudio Scimone\n\nJacques Ibert\nCuatro canciones de Don Quijote\nCarlos Álvarez, barítono\nOrquesta de la Comunidad de Madrid / José Ramón Encinar\n\nJohann Sebastian Bach\n“Aria” de la Suite para orquesta en Re mayor, BWV 1068\nOrquesta de Cámara Franz Liszt de Budapest / Janos Rolla\n\nLudwig van Beethoven\nSonata para piano Nº26 en Mi bemol mayor, op.81a, “Los adioses”\nAlexander Panizza, piano\n				12:00:00	13:00:00	2013-12-08 00:15:23.151-03	3
109	Ciclos					20:00:00	21:00:00	2013-12-08 00:15:23.151-03	3
110	Música nocturna					21:00:00	23:00:00	2013-12-08 00:15:23.151-03	3
98	La musica del fauno	Prueba				13:00:00	15:00:00	2013-12-08 00:15:23.151-03	3
103	Música documental					15:00:00	16:00:00	2013-12-08 00:15:23.151-03	3
104	Tarde de clásicos		Clara de la Rosa			16:00:00	18:00:00	2013-12-08 00:15:23.151-03	3
105	La odisea del regreso					18:00:00	20:00:00	2013-12-08 00:15:23.151-03	3
106	Tarde transfigurada		Luis Gorelik			18:00:00	20:00:00	2013-12-08 00:15:23.151-03	3
11	Diario del futuro	Diario del futuro	Nicolás Lantos y Florencia Alcaraz	uploaded_images/DIARIO.jpg		00:00:00	02:00:00	2013-11-19 09:51:57-03	1
18	La espuma de las noches		Andy Chango	uploaded_images/espuma.jpg		00:00:00	02:00:00	2013-11-19 09:51:57-03	1
117	Pasión Nacional		Roberto Perfumo, Gustavo Vergara y equipo de deportes			17:00:00	18:00:00	2013-12-12 18:06:46.216-03	5
112	Industria Nacional	dd	ss	uploaded_images/IN2_4.jpg		23:00:00	00:00:00	2013-12-08 00:15:23.151-03	3
17	El rock nació mal	el crock nació mal	Andrés Ruiz	uploaded_images/NACIOMAL.jpg		22:00:00	23:59:00	2013-11-19 09:51:57-03	1
95	Y la mañana va	Música para acompañarte cuando comienza el día.		uploaded_images/logo_app_3.JPG		07:00:00	11:00:00	2013-12-08 00:15:23.151-03	3
90	Aver	que pasa	con este	uploaded_images/splash.png	0,0,2200,3300	17:00:00	19:00:00	2013-12-05 21:37:29-03	2
120	Siempre Argentina-Conexión Portugués		JULIETA GALVAN	uploaded_images/juli_galvan.png		09:00:00	10:00:00	2013-12-22 02:07:08.065-03	4
128	Siempre Argentina-Conexión Latinoamérica II		MIRIAN TÚRKULA	uploaded_images/mir_turk.jpg		19:00:00	20:00:00	2013-12-22 02:07:08.065-03	4
119	Siempre Argentina-Conexión Japonés		KEIKO UEDA	uploaded_images/kei_ue.png		08:00:00	09:00:00	2013-12-22 02:07:08.065-03	4
124	Siempre Argentina-Conexión Inglés		MIRIAM TÚRKULA	uploaded_images/mir_fer_3_2.jpg		15:00:00	15:57:00	2013-12-22 02:07:08.065-03	4
122	Siempre Argentina-Conexión Español		CHELO AYALA	uploaded_images/che_aya.jpg		11:00:00	12:00:00	2013-12-22 02:07:08.065-03	4
130	Siempre Argentina-Conexión Portugués II		MIRTA CÁNEPA	uploaded_images/mir_can.jpg		21:00:00	21:57:00	2013-12-22 02:07:08.065-03	4
126	Siempre Argentina-Conexión Francés		MAGDALENA ARNOUX	uploaded_images/mag_arn.jpg		17:00:00	17:57:00	2013-12-22 02:07:08.065-03	4
127	Siempre Argentina-Conexión Alemán		RAYÉN BRAUN Y CARLOS DIAZ ROCCA	uploaded_images/ray_car_1.jpg		18:00:00	19:00:00	2013-12-22 02:07:08.065-03	4
125	Siempre Argentina-Conexión Italiano		CARITINA CÓSULICH Y CHELO AYALA	uploaded_images/cari_che.jpg		16:00:00	16:57:00	2013-12-22 02:07:08.065-03	4
129	Siempre Argentina-Conexión Español II		DARÍO BURSZTYN			20:00:00	21:00:00	2013-12-22 02:07:08.065-03	4
123	Siempre Argentina-Conexión Alemán (Rep)		RAYÉN BRAUN Y CARLOS DIAZ ROCCA	uploaded_images/ray_car.jpg		14:00:00	14:57:00	2013-12-22 02:07:08.065-03	4
121	Siempre Argentina-Conexión Latinoamérica		ANGEL FLOREANO	uploaded_images/ang_flo.png		10:00:00	11:00:00	2013-12-22 02:07:08.065-03	4
8	Spam!	Spam	Srta Bimbo y Alejandro Lingenti	uploaded_images/spam_1.jpg		15:00:00	18:00:00	2013-11-19 09:51:57-03	1
2	Burundanga		Gillespie y Malena Pichot	uploaded_images/BURUNDANGA.jpg	48,0,130,124	18:00:00	21:00:00	2013-11-18 20:12:05-03	1
3	Nunca lo sabrán		Maitena Aboitiz y Diego Mancusi	uploaded_images/nunca.jpg	0,0,320,480	21:00:00	23:00:00	2013-11-18 20:12:05-03	1
10	Polifonía Nocturna	Polifonía Nocturna	Carlos Polimeni	uploaded_images/polifonia.jpg		23:00:00	00:00:00	2013-11-19 09:51:57-03	1
7	Mute	Mute	Castañeda, Zabo, Jesicall y Kartún	uploaded_images/muteint.jpg		13:00:00	15:00:00	2013-11-19 09:51:57-03	1
13	Territorio Comanche		Daniel Tognetti, Sergio Ranieri y Eduardo Fabregat	uploaded_images/territoriocomancheint.jpg		09:00:00	12:00:00	2013-11-19 09:51:57-03	1
12	Programación Musical		Carla Ruiz	uploaded_images/generico_1.jpg		02:00:00	07:00:00	2013-11-19 09:51:57-03	1
14	Figuración	Alfredo Rosso	Alfredo Rosso y Noemi Hackel	uploaded_images/figuracion.jpg		12:00:00	14:00:00	2013-11-19 09:51:57-03	1
1	No Tan Distintos	Cultura Latinoamericana. Rock. Viajes. Música	Chicho Pellegrini y equipo	uploaded_images/NTD.jpg	320,0,320,0	18:00:00	22:00:00	2013-11-18 20:12:05-03	1
23	Emociones Rock	emociones Rock	Carlos Melo	uploaded_images/emociones.jpg		08:00:00	10:00:00	2013-11-19 09:51:57-03	1
19	Argentina Electrónica	Argentina electrónica	Nacional Rock 93.7	uploaded_images/electronica.jpg		00:00:00	07:00:00	2013-11-19 09:51:57-03	1
20	El fin de la metáfora	El fin de la metáfora	Facundo Ale, Guido Stochik e Ivan Schargrodski	uploaded_images/elfindelametafora.jpg		10:00:00	12:00:00	2013-11-19 09:51:57-03	1
21	Rock de la casa	rock de la casa	Nacional Rock 93.7	uploaded_images/ROCKDECASA.jpg	119,0,202,124	13:00:00	16:00:00	2013-11-19 09:51:57-03	1
22	Teloneros del fútbol		Adrián y Alejandro Korol	uploaded_images/SIEMPRE.jpg		16:00:00	18:00:00	2013-11-19 09:51:57-03	1
132	Siempre Argentina-Conexión Inglés		FERNANDO FARIAS	uploaded_images/mir_fer_3_1.jpg		23:00:00	00:00:00	2013-12-22 02:07:08.065-03	4
131	Siempre Argentina-Conexión Japonés II		MARCELO CARBALLAL	uploaded_images/mar_car.jpg		22:00:00	23:00:00	2013-12-22 02:07:08.065-03	4
6	Segurola y Habana	Segurola y Habana	Julia Mengolini e Ivan Schargrodski	uploaded_images/segurola.jpg		10:00:00	13:00:00	2013-11-19 09:51:57-03	1
146	Conversa		Agustín Castañeda y Francisco Yofre	uploaded_images/conversaint.jpg		12:00:00	13:00:00	2014-02-16 01:54:18.185-03	1
135	Panorama de Noticias-Link AM870					12:00:00	12:30:00	2013-12-22 02:07:08.065-03	4
147	Fútbol pasión nacional		Transmisión de los clásicos del domingo	uploaded_images/futbol.jpg		18:00:00	23:30:00	2014-02-16 01:54:18.185-03	1
138	Boletìn de Noticias RAE					15:57:00	16:00:00	2013-12-22 02:07:08.065-03	4
139	Boletìn de Noticias RAE					16:57:00	17:00:00	2013-12-22 02:07:08.065-03	4
140	Boletìn de Noticias RAE					17:57:00	18:00:00	2013-12-22 02:07:08.065-03	4
141	Boletìn de Noticias RAE					21:57:00	22:00:00	2013-12-22 02:07:08.065-03	4
142	Boletìn de Noticias RAE					14:57:00	15:00:00	2013-12-22 02:07:08.065-03	4
133	Siempre Argentina-Conexión Francés II		DIEGO FILLOY			00:00:00	01:00:00	2013-12-22 02:07:08.065-03	4
145	Sigla Gong					13:45:00	14:00:00	2013-12-22 02:07:08.065-03	4
143	Sigla-Gong-Himno Nacional					06:45:00	07:00:00	2013-12-22 02:07:08.065-03	4
134	Siempre Argentina-Conexión Chino (Rep)		LINAJI DE OVIEDO	uploaded_images/lina_ji.png		01:00:00	02:00:00	2013-12-22 02:07:08.065-03	4
118	Siempre Argentina-Conexión Chino		LINAJI DE OVIEDO	uploaded_images/lina_ji_1.png		07:00:00	08:00:00	2013-12-22 02:07:08.065-03	4
136	Link AM870		Duplex con AM870	uploaded_images/rad_nac_3.jpg		09:00:00	23:30:00	2013-12-22 02:07:08.065-03	4
137	Link AM870		Duplex con AM870	uploaded_images/rad_nac_4.jpg		09:00:00	00:00:00	2013-12-22 02:07:08.065-03	4
144	Gente de a pie-Link AM870		MARIO WAINFELD	uploaded_images/mar_waif.jpg		12:30:00	13:45:00	2013-12-22 02:07:08.065-03	4
148	La Turba					20:00:00	22:00:00	2014-02-27 08:59:32.380914-03	6
149	Contra				498,0,1421,1386	22:00:00	23:59:00	2014-03-01 00:59:52-03	6
151	Reflex					19:00:00	21:00:00	2014-03-01 06:09:12.479504-03	6
152	Jock Horror/J.H Musica					21:00:00	22:30:00	2014-03-01 06:09:12.479504-03	6
153	Argentina Skate Rock					23:00:00	23:59:59	2014-03-01 06:09:12.479504-03	6
154	La Dimension Bipolar					19:00:00	21:00:00	2014-03-01 06:09:12.479504-03	6
155	Cuando Quieras y Donde Quieras					21:00:00	23:00:00	2014-03-01 06:09:12.479504-03	6
156	El Acople					23:00:00	23:59:59	2014-03-01 06:09:12.479504-03	6
157	Aire Acondicionado					18:00:00	20:00:00	2014-03-01 06:09:12.479504-03	6
158	Club Social y Musical de la Vieja Cuela					20:00:00	22:00:00	2014-03-01 06:09:12.479504-03	6
159	Jueves Radioactivos					22:00:00	23:59:59	2014-03-01 06:09:12.479504-03	6
160	Vuelen Topos Vuelen					18:00:00	20:00:00	2014-03-01 06:09:12.479504-03	6
161	Pizza Birra & Chewbacca					20:00:00	22:00:00	2014-03-01 06:09:12.479504-03	6
162	Vale Molinete					22:00:00	23:59:59	2014-03-01 06:09:12.479504-03	6
163	Argentina Skate Rock					00:00:00	01:00:00	2014-03-01 06:09:12.479504-03	6
164	El Acople					00:00:00	01:00:00	2014-03-01 06:09:12.479504-03	6
165	Jueves Radioactivos					00:00:00	01:00:00	2014-03-01 06:09:12.479504-03	6
166	Vale Molinete					00:00:00	01:00:00	2014-03-01 06:09:12.479504-03	6
167	Sin Verguenzas					18:00:00	19:00:00	2014-03-01 06:09:12.479504-03	6
168	Idiotas con Talento					19:00:00	21:00:00	2014-03-01 06:09:12.479504-03	6
169	Radio Pirata Transmite					21:00:00	23:59:59	2014-03-01 06:09:12.479504-03	6
170	Raras Vibraciones					18:00:00	21:00:00	2014-03-01 06:09:12.479504-03	6
171	Pudriendola					21:00:00	23:00:00	2014-03-01 06:09:12.479504-03	6
173	aaaaa		fffff	uploaded_images/ramonymous_4.jpg		09:00:00	18:00:00	2014-03-01 07:07:08.169818-03	6
\.


--
-- Data for Name: timeslot_program_days; Type: TABLE DATA; Schema: public; Owner: rna
--

COPY timeslot_program_days (id, program_id, day_id) FROM stdin;
1	16	6
2	15	6
3	5	1
4	5	3
5	5	2
6	5	5
7	5	4
8	96	1
9	96	3
10	96	2
11	96	5
12	96	4
13	108	5
14	99	3
15	97	1
16	97	3
17	97	2
18	97	5
19	97	4
20	109	1
21	109	3
22	109	2
23	109	5
24	109	4
25	110	1
26	110	3
27	110	2
28	110	5
29	110	4
30	98	1
31	98	3
32	98	2
33	98	5
34	98	4
35	103	1
36	103	3
37	103	2
38	103	5
39	103	4
40	104	1
41	104	3
42	104	2
43	104	5
44	104	4
45	105	1
46	105	4
47	106	2
48	11	3
49	11	2
50	11	5
51	11	4
52	18	6
53	117	5
54	112	1
55	112	3
56	112	2
57	112	5
58	112	4
59	17	6
60	95	1
61	95	3
62	95	2
63	95	5
64	95	4
65	90	5
66	120	1
67	120	3
68	120	2
69	120	5
70	120	4
71	128	1
72	128	3
73	128	2
74	128	5
75	128	4
76	119	1
77	119	3
78	119	2
79	119	5
80	119	4
81	124	1
82	124	3
83	124	2
84	124	5
85	124	4
86	122	1
87	122	3
88	122	2
89	122	5
90	122	4
91	130	1
92	130	3
93	130	2
94	130	5
95	130	4
96	126	1
97	126	3
98	126	2
99	126	5
100	126	4
101	127	1
102	127	3
103	127	2
104	127	5
105	127	4
106	125	1
107	125	3
108	125	2
109	125	5
110	125	4
111	129	1
112	129	3
113	129	2
114	129	5
115	129	4
116	123	1
117	123	3
118	123	2
119	123	5
120	123	4
121	121	1
122	121	3
123	121	2
124	121	5
125	121	4
126	8	1
127	8	3
128	8	2
129	8	5
130	8	4
131	2	1
132	2	3
133	2	2
134	2	5
135	2	4
136	3	1
137	3	3
138	3	2
139	3	5
140	3	4
141	10	1
142	10	3
143	10	2
144	10	5
145	10	4
146	7	1
147	7	3
148	7	2
149	7	5
150	7	4
151	13	6
152	12	3
153	12	2
154	12	5
155	12	4
156	14	6
157	1	6
158	23	7
159	19	7
160	20	7
161	21	7
162	22	7
163	132	1
164	132	3
165	132	2
166	132	5
167	132	4
168	131	1
169	131	3
170	131	2
171	131	5
172	131	4
173	6	1
174	6	3
175	6	2
176	6	5
177	6	4
178	146	7
179	135	1
180	135	3
181	135	2
182	135	5
183	135	4
184	147	7
185	138	1
186	138	3
187	138	2
188	138	5
189	138	4
190	139	1
191	139	3
192	139	2
193	139	5
194	139	4
195	140	1
196	140	3
197	140	2
198	140	5
199	140	4
200	141	1
201	141	3
202	141	2
203	141	5
204	141	4
205	142	1
206	142	3
207	142	2
208	142	5
209	142	4
210	133	1
211	133	3
212	133	2
213	133	5
214	133	4
215	145	1
216	145	3
217	145	2
218	145	5
219	145	4
220	143	1
221	143	3
222	143	2
223	143	5
224	143	4
225	134	1
226	134	3
227	134	2
228	134	5
229	134	4
230	118	1
231	118	3
232	118	2
233	118	5
234	118	4
235	136	6
236	137	7
237	144	1
238	144	3
239	144	2
240	144	5
241	144	4
259	148	1
260	149	1
261	151	2
262	152	2
263	153	2
264	154	3
265	155	3
266	156	3
267	157	4
268	158	4
269	159	4
270	160	5
271	161	5
272	162	5
273	163	3
274	164	4
275	165	5
276	166	6
277	167	6
278	168	6
279	169	6
280	170	7
281	171	7
283	173	6
\.


--
-- Name: timeslot_program_days_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rna
--

SELECT pg_catalog.setval('timeslot_program_days_id_seq', 283, true);


--
-- Name: timeslot_program_id_seq; Type: SEQUENCE SET; Schema: public; Owner: rna
--

SELECT pg_catalog.setval('timeslot_program_id_seq', 173, true);


--
-- Name: ajax_upload_uploadedfile_pkey; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY ajax_upload_uploadedfile
    ADD CONSTRAINT ajax_upload_uploadedfile_pkey PRIMARY KEY (id);


--
-- Name: auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions_group_id_permission_id_key; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_key UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission_content_type_id_codename_key; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_key UNIQUE (content_type_id, codename);


--
-- Name: auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups_user_id_group_id_key; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_key UNIQUE (user_id, group_id);


--
-- Name: auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions_user_id_permission_id_key; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_key UNIQUE (user_id, permission_id);


--
-- Name: auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- Name: django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type_app_label_model_key; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_key UNIQUE (app_label, model);


--
-- Name: django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: django_site_pkey; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY django_site
    ADD CONSTRAINT django_site_pkey PRIMARY KEY (id);


--
-- Name: easy_thumbnails_source_name_7549c98cc6dd6969_uniq; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY easy_thumbnails_source
    ADD CONSTRAINT easy_thumbnails_source_name_7549c98cc6dd6969_uniq UNIQUE (name, storage_hash);


--
-- Name: easy_thumbnails_source_pkey; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY easy_thumbnails_source
    ADD CONSTRAINT easy_thumbnails_source_pkey PRIMARY KEY (id);


--
-- Name: easy_thumbnails_thumbnail_pkey; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY easy_thumbnails_thumbnail
    ADD CONSTRAINT easy_thumbnails_thumbnail_pkey PRIMARY KEY (id);


--
-- Name: easy_thumbnails_thumbnail_source_id_1f50d53db8191480_uniq; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY easy_thumbnails_thumbnail
    ADD CONSTRAINT easy_thumbnails_thumbnail_source_id_1f50d53db8191480_uniq UNIQUE (source_id, name, storage_hash);


--
-- Name: registration_registrationprofile_pkey; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY registration_registrationprofile
    ADD CONSTRAINT registration_registrationprofile_pkey PRIMARY KEY (id);


--
-- Name: registration_registrationprofile_user_id_key; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY registration_registrationprofile
    ADD CONSTRAINT registration_registrationprofile_user_id_key UNIQUE (user_id);


--
-- Name: south_migrationhistory_pkey; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY south_migrationhistory
    ADD CONSTRAINT south_migrationhistory_pkey PRIMARY KEY (id);


--
-- Name: timeslot_config_pkey; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY timeslot_config
    ADD CONSTRAINT timeslot_config_pkey PRIMARY KEY (id);


--
-- Name: timeslot_day_pkey; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY timeslot_day
    ADD CONSTRAINT timeslot_day_pkey PRIMARY KEY (id);


--
-- Name: timeslot_program_days_pkey; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY timeslot_program_days
    ADD CONSTRAINT timeslot_program_days_pkey PRIMARY KEY (id);


--
-- Name: timeslot_program_days_program_id_2ccf7b20f5e77129_uniq; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY timeslot_program_days
    ADD CONSTRAINT timeslot_program_days_program_id_2ccf7b20f5e77129_uniq UNIQUE (program_id, day_id);


--
-- Name: timeslot_program_pkey; Type: CONSTRAINT; Schema: public; Owner: rna; Tablespace: 
--

ALTER TABLE ONLY timeslot_program
    ADD CONSTRAINT timeslot_program_pkey PRIMARY KEY (id);


--
-- Name: auth_group_permissions_group_id; Type: INDEX; Schema: public; Owner: rna; Tablespace: 
--

CREATE INDEX auth_group_permissions_group_id ON auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id; Type: INDEX; Schema: public; Owner: rna; Tablespace: 
--

CREATE INDEX auth_group_permissions_permission_id ON auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id; Type: INDEX; Schema: public; Owner: rna; Tablespace: 
--

CREATE INDEX auth_permission_content_type_id ON auth_permission USING btree (content_type_id);


--
-- Name: auth_user_groups_group_id; Type: INDEX; Schema: public; Owner: rna; Tablespace: 
--

CREATE INDEX auth_user_groups_group_id ON auth_user_groups USING btree (group_id);


--
-- Name: auth_user_groups_user_id; Type: INDEX; Schema: public; Owner: rna; Tablespace: 
--

CREATE INDEX auth_user_groups_user_id ON auth_user_groups USING btree (user_id);


--
-- Name: auth_user_user_permissions_permission_id; Type: INDEX; Schema: public; Owner: rna; Tablespace: 
--

CREATE INDEX auth_user_user_permissions_permission_id ON auth_user_user_permissions USING btree (permission_id);


--
-- Name: auth_user_user_permissions_user_id; Type: INDEX; Schema: public; Owner: rna; Tablespace: 
--

CREATE INDEX auth_user_user_permissions_user_id ON auth_user_user_permissions USING btree (user_id);


--
-- Name: django_admin_log_content_type_id; Type: INDEX; Schema: public; Owner: rna; Tablespace: 
--

CREATE INDEX django_admin_log_content_type_id ON django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id; Type: INDEX; Schema: public; Owner: rna; Tablespace: 
--

CREATE INDEX django_admin_log_user_id ON django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date; Type: INDEX; Schema: public; Owner: rna; Tablespace: 
--

CREATE INDEX django_session_expire_date ON django_session USING btree (expire_date);


--
-- Name: easy_thumbnails_source_name; Type: INDEX; Schema: public; Owner: rna; Tablespace: 
--

CREATE INDEX easy_thumbnails_source_name ON easy_thumbnails_source USING btree (name);


--
-- Name: easy_thumbnails_source_storage_hash; Type: INDEX; Schema: public; Owner: rna; Tablespace: 
--

CREATE INDEX easy_thumbnails_source_storage_hash ON easy_thumbnails_source USING btree (storage_hash);


--
-- Name: easy_thumbnails_thumbnail_name; Type: INDEX; Schema: public; Owner: rna; Tablespace: 
--

CREATE INDEX easy_thumbnails_thumbnail_name ON easy_thumbnails_thumbnail USING btree (name);


--
-- Name: easy_thumbnails_thumbnail_source_id; Type: INDEX; Schema: public; Owner: rna; Tablespace: 
--

CREATE INDEX easy_thumbnails_thumbnail_source_id ON easy_thumbnails_thumbnail USING btree (source_id);


--
-- Name: easy_thumbnails_thumbnail_storage_hash; Type: INDEX; Schema: public; Owner: rna; Tablespace: 
--

CREATE INDEX easy_thumbnails_thumbnail_storage_hash ON easy_thumbnails_thumbnail USING btree (storage_hash);


--
-- Name: timeslot_config_user_id; Type: INDEX; Schema: public; Owner: rna; Tablespace: 
--

CREATE INDEX timeslot_config_user_id ON timeslot_config USING btree (user_id);


--
-- Name: timeslot_program_days_day_id; Type: INDEX; Schema: public; Owner: rna; Tablespace: 
--

CREATE INDEX timeslot_program_days_day_id ON timeslot_program_days USING btree (day_id);


--
-- Name: timeslot_program_days_program_id; Type: INDEX; Schema: public; Owner: rna; Tablespace: 
--

CREATE INDEX timeslot_program_days_program_id ON timeslot_program_days USING btree (program_id);


--
-- Name: timeslot_program_user_id; Type: INDEX; Schema: public; Owner: rna; Tablespace: 
--

CREATE INDEX timeslot_program_user_id ON timeslot_program USING btree (user_id);


--
-- Name: auth_group_permissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rna
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups_group_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rna
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_fkey FOREIGN KEY (group_id) REFERENCES auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rna
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: content_type_id_refs_id_728de91f; Type: FK CONSTRAINT; Schema: public; Owner: rna
--

ALTER TABLE ONLY auth_permission
    ADD CONSTRAINT content_type_id_refs_id_728de91f FOREIGN KEY (content_type_id) REFERENCES django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: day_id_refs_id_e39650da; Type: FK CONSTRAINT; Schema: public; Owner: rna
--

ALTER TABLE ONLY timeslot_program_days
    ADD CONSTRAINT day_id_refs_id_e39650da FOREIGN KEY (day_id) REFERENCES timeslot_day(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log_content_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rna
--

ALTER TABLE ONLY django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_fkey FOREIGN KEY (content_type_id) REFERENCES django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rna
--

ALTER TABLE ONLY django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: group_id_refs_id_3cea63fe; Type: FK CONSTRAINT; Schema: public; Owner: rna
--

ALTER TABLE ONLY auth_group_permissions
    ADD CONSTRAINT group_id_refs_id_3cea63fe FOREIGN KEY (group_id) REFERENCES auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: program_id_refs_id_be6812e0; Type: FK CONSTRAINT; Schema: public; Owner: rna
--

ALTER TABLE ONLY timeslot_program_days
    ADD CONSTRAINT program_id_refs_id_be6812e0 FOREIGN KEY (program_id) REFERENCES timeslot_program(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: registration_registrationprofile_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: rna
--

ALTER TABLE ONLY registration_registrationprofile
    ADD CONSTRAINT registration_registrationprofile_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: source_id_refs_id_5bffe8f5; Type: FK CONSTRAINT; Schema: public; Owner: rna
--

ALTER TABLE ONLY easy_thumbnails_thumbnail
    ADD CONSTRAINT source_id_refs_id_5bffe8f5 FOREIGN KEY (source_id) REFERENCES easy_thumbnails_source(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: user_id_refs_id_767e8259; Type: FK CONSTRAINT; Schema: public; Owner: rna
--

ALTER TABLE ONLY timeslot_config
    ADD CONSTRAINT user_id_refs_id_767e8259 FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: user_id_refs_id_831107f1; Type: FK CONSTRAINT; Schema: public; Owner: rna
--

ALTER TABLE ONLY auth_user_groups
    ADD CONSTRAINT user_id_refs_id_831107f1 FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: user_id_refs_id_ea0cabaa; Type: FK CONSTRAINT; Schema: public; Owner: rna
--

ALTER TABLE ONLY timeslot_program
    ADD CONSTRAINT user_id_refs_id_ea0cabaa FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: user_id_refs_id_f2045483; Type: FK CONSTRAINT; Schema: public; Owner: rna
--

ALTER TABLE ONLY auth_user_user_permissions
    ADD CONSTRAINT user_id_refs_id_f2045483 FOREIGN KEY (user_id) REFERENCES auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

