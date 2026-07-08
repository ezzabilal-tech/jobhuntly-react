import { useState } from 'react';
import { Bell, Calendar, Clock } from 'lucide-react';
import './NotificationPanel.css';

const NOTIFICATIONS = [
  {
    id: 1,
    name: 'Jan Mayer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    text: 'invited you to interview with Nomad',
    tag: 'New',
    tagClass: 'tag--new',
    time: '12 mins ago',
    expanded: null,
  },
  {
    id: 2,
    name: 'Jana Alicia',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    text: 'from Udacity updated your job applications status',
    tag: 'Shortlisted',
    tagClass: 'tag--shortlisted',
    time: '3 days ago',
    expanded: null,
  },
  {
    id: 3,
    name: 'Ally Wales',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
    text: 'from Digital Ocean sent you an interview invitation',
    tag: null,
    time: '14 July 2021 . 3:26 PM',
    expanded: {
      title: 'Interview - Jake Gyll',
      role: 'Social Media Manager Role',
      date: 'Mon, 20 July 2021',
      timeRange: '12 PM - 12:30 PM',
      person: 'Jake Gyll',
      email: 'jakegyll@email.com',
      personAvatar:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&auto=format&fit=crop&q=80',
    },
  },
];

export default function NotificationPanel() {
  const [open, setOpen] = useState(false);
  const [readIds, setReadIds] = useState([]);

  const handleMarkAllRead = () => {
    setReadIds(NOTIFICATIONS.map((n) => n.id));
  };

  return (
    <div className="notif-panel-wrapper">
      <button
        className="btn-notification"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Notifications"
      >
        <Bell size={20} />
      </button>

      {open && (
        <>
          <div className="notif-panel-backdrop" onClick={() => setOpen(false)} />
          <div className="notif-panel">
            <div className="notif-panel-header">
              <h3>Notifications</h3>
              <button className="notif-mark-read" onClick={handleMarkAllRead}>
                Mark all as read
              </button>
            </div>

            <div className="notif-panel-list">
              {NOTIFICATIONS.map((n) => (
                <div
                  key={n.id}
                  className={`notif-item ${readIds.includes(n.id) ? 'notif-item--read' : ''}`}
                >
                  <img src={n.avatar} alt={n.name} className="notif-avatar" />
                  <div className="notif-item-body">
                    <p className="notif-item-text">
                      <strong>{n.name}</strong> {n.text}
                    </p>

                    {n.tag && (
                      <span className={`notif-tag ${n.tagClass}`}>{n.tag}</span>
                    )}

                    {n.expanded && (
                      <div className="notif-expanded-card">
                        <h4>{n.expanded.title}</h4>
                        <p className="notif-expanded-role">{n.expanded.role}</p>
                        <div className="notif-expanded-meta">
                          <div className="notif-expanded-meta-item">
                            <Calendar size={13} />
                            <div>
                              <span className="notif-expanded-meta-label">Date</span>
                              <span className="notif-expanded-meta-value">{n.expanded.date}</span>
                            </div>
                          </div>
                          <div className="notif-expanded-meta-item">
                            <Clock size={13} />
                            <div>
                              <span className="notif-expanded-meta-label">Time</span>
                              <span className="notif-expanded-meta-value">
                                {n.expanded.timeRange}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="notif-expanded-person">
                          <img src={n.expanded.personAvatar} alt={n.expanded.person} />
                          <div>
                            <span className="notif-expanded-person-name">{n.expanded.person}</span>
                            <span className="notif-expanded-person-email">{n.expanded.email}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <span className="notif-item-time">{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}