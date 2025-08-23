"""
PhishGuard - Advanced Phishing Detection System
Implements 24 sophisticated phishing detection features
"""

import re
import urllib.parse
import socket
import ssl
import requests
from datetime import datetime
import tldextract
import dns.resolver
import whois
from bs4 import BeautifulSoup
import time

class PhishingDetector:
    def __init__(self):
        self.features = {
            'IP_ADDRESS': {'name': 'IP Address in URL', 'weight': 3},
            'LONG_URL': {'name': 'Long URL', 'weight': 2},
            'URL_SHORTENER': {'name': 'URL Shortener', 'weight': 2},
            'AT_SYMBOL': {'name': '@ Symbol in URL', 'weight': 3},
            'REDIRECTING': {'name': 'Redirecting with //', 'weight': 2},
            'PREFIX_SUFFIX': {'name': 'Prefix/Suffix in Domain', 'weight': 2},
            'MULTI_SUBDOMAIN': {'name': 'Multi Subdomain', 'weight': 2},
            'SSL_CERTIFICATE': {'name': 'SSL Certificate Validity', 'weight': 3},
            'DOMAIN_REGISTRATION': {'name': 'Domain Registration Length', 'weight': 2},
            'FAVICON_DOMAIN': {'name': 'Favicon Domain Match', 'weight': 1},
            'NON_STANDARD_PORT': {'name': 'Non-standard Port', 'weight': 2},
            'HTTPS_IN_DOMAIN': {'name': 'HTTPS in Domain Name', 'weight': 3},
            'REQUEST_URL': {'name': 'External Request URLs', 'weight': 2},
            'ANCHOR_TAGS': {'name': 'External Anchor Tags', 'weight': 2},
            'LINKS_IN_META': {'name': 'Links in Meta/Script/Link', 'weight': 2},
            'SERVER_FORM_HANDLER': {'name': 'Server Form Handler', 'weight': 2},
            'SUBMITTING_TO_EMAIL': {'name': 'Submitting to Email', 'weight': 3},
            'IFRAME_USAGE': {'name': 'Iframe Usage', 'weight': 2},
            'STATUS_BAR_MANIPULATION': {'name': 'Status Bar Manipulation', 'weight': 2},
            'DOMAIN_AGE': {'name': 'Domain Age', 'weight': 2},
            'DNS_RECORD': {'name': 'DNS Record Existence', 'weight': 3},
            'WHOIS_EXPIRATION': {'name': 'WHOIS Expiration', 'weight': 2},
            'WHOIS_CREATION': {'name': 'WHOIS Creation Date', 'weight': 2},
            'EXTERNAL_FORM_ACTION': {'name': 'External Form Action', 'weight': 2}
        }
        
        self.url_shorteners = [
            'bit.ly', 'tinyurl.com', 't.co', 'goo.gl', 'ow.ly', 
            'short.link', 'tiny.cc', 'is.gd', 'buff.ly', 'ift.tt'
        ]
        
        self.suspicious_tlds = ['.tk', '.ml', '.ga', '.cf', '.cc', '.pw', '.top']

    def analyze_url(self, url):
        """Main analysis function that processes all 24 features"""
        try:
            parsed_url = urllib.parse.urlparse(url)
            if not parsed_url.scheme or not parsed_url.netloc:
                raise ValueError("Invalid URL format")
            
            features = []
            
            # Extract domain information
            extracted = tldextract.extract(url)
            domain = f"{extracted.domain}.{extracted.suffix}"
            hostname = parsed_url.netloc
            
            # Analyze all 24 features
            features.append(self._check_ip_address(hostname))
            features.append(self._check_long_url(url))
            features.append(self._check_url_shortener(hostname))
            features.append(self._check_at_symbol(url))
            features.append(self._check_redirecting(url))
            features.append(self._check_prefix_suffix(hostname))
            features.append(self._check_multi_subdomain(hostname))
            features.append(self._check_ssl_certificate(parsed_url))
            features.append(self._check_domain_registration(domain))
            features.append(self._check_favicon_domain(url, domain))
            features.append(self._check_non_standard_port(parsed_url.port))
            features.append(self._check_https_in_domain(hostname))
            
            # Web content analysis features
            html_content = self._get_html_content(url)
            features.append(self._check_request_url(html_content, domain))
            features.append(self._check_anchor_tags(html_content, domain))
            features.append(self._check_links_in_meta(html_content, domain))
            features.append(self._check_server_form_handler(html_content, domain))
            features.append(self._check_submitting_to_email(html_content))
            features.append(self._check_iframe_usage(html_content))
            features.append(self._check_status_bar_manipulation(html_content))
            
            # Domain analysis features
            features.append(self._check_domain_age(domain))
            features.append(self._check_dns_record(domain))
            features.append(self._check_whois_expiration(domain))
            features.append(self._check_whois_creation(domain))
            features.append(self._check_external_form_action(html_content, domain))
            
            # Calculate overall score
            score_data = self._calculate_score(features)
            
            # Generate recommendations
            recommendations = self._generate_recommendations(features, score_data['classification'])
            
            return {
                'url': url,
                'overall_score': score_data['score'],
                'classification': score_data['classification'],
                'confidence': score_data['confidence'],
                'features': features,
                'recommendations': recommendations
            }
            
        except Exception as e:
            print(f"Error analyzing URL {url}: {str(e)}")
            raise Exception(f"Analysis failed: {str(e)}")

    def _check_ip_address(self, hostname):
        """Feature 1: Check if URL uses IP address instead of domain"""
        ip_pattern = r'^(\d{1,3}\.){3}\d{1,3}$'
        value = -1 if re.match(ip_pattern, hostname.split(':')[0]) else 0
        
        return {
            'name': self.features['IP_ADDRESS']['name'],
            'weight': self.features['IP_ADDRESS']['weight'],
            'value': value,
            'description': 'URL uses IP address instead of domain name' if value == -1 else 'URL uses proper domain name'
        }

    def _check_long_url(self, url):
        """Feature 2: Check URL length"""
        length = len(url)
        if length > 150:
            value = -1
        elif length > 75:
            value = 1
        else:
            value = 0
            
        return {
            'name': self.features['LONG_URL']['name'],
            'weight': self.features['LONG_URL']['weight'],
            'value': value,
            'description': f'URL length: {length} characters'
        }

    def _check_url_shortener(self, hostname):
        """Feature 3: Check if URL uses shortening service"""
        value = 1 if any(shortener in hostname.lower() for shortener in self.url_shorteners) else 0
        
        return {
            'name': self.features['URL_SHORTENER']['name'],
            'weight': self.features['URL_SHORTENER']['weight'],
            'value': value,
            'description': 'URL uses shortening service' if value == 1 else 'URL does not use shortening service'
        }

    def _check_at_symbol(self, url):
        """Feature 4: Check for @ symbol in URL"""
        value = -1 if '@' in url else 0
        
        return {
            'name': self.features['AT_SYMBOL']['name'],
            'weight': self.features['AT_SYMBOL']['weight'],
            'value': value,
            'description': 'URL contains @ symbol (potential redirect)' if value == -1 else 'No @ symbol found'
        }

    def _check_redirecting(self, url):
        """Feature 5: Check for redirecting with //"""
        redirect_pattern = r'\/\/.*\/\/'
        value = -1 if re.search(redirect_pattern, url) else 0
        
        return {
            'name': self.features['REDIRECTING']['name'],
            'weight': self.features['REDIRECTING']['weight'],
            'value': value,
            'description': 'URL contains redirecting //' if value == -1 else 'No suspicious redirects found'
        }

    def _check_prefix_suffix(self, hostname):
        """Feature 6: Check for prefix/suffix in domain"""
        value = 1 if '-' in hostname else 0
        
        return {
            'name': self.features['PREFIX_SUFFIX']['name'],
            'weight': self.features['PREFIX_SUFFIX']['weight'],
            'value': value,
            'description': 'Domain contains prefix/suffix (-)' if value == 1 else 'No prefix/suffix in domain'
        }

    def _check_multi_subdomain(self, hostname):
        """Feature 7: Check for multiple subdomains"""
        subdomains = hostname.count('.') - 1
        if subdomains > 2:
            value = -1
        elif subdomains > 1:
            value = 1
        else:
            value = 0
            
        return {
            'name': self.features['MULTI_SUBDOMAIN']['name'],
            'weight': self.features['MULTI_SUBDOMAIN']['weight'],
            'value': value,
            'description': f'Domain has {subdomains} subdomain(s)'
        }

    def _check_ssl_certificate(self, parsed_url):
        """Feature 8: Check SSL certificate validity"""
        value = 0 if parsed_url.scheme == 'https' else -1
        
        return {
            'name': self.features['SSL_CERTIFICATE']['name'],
            'weight': self.features['SSL_CERTIFICATE']['weight'],
            'value': value,
            'description': 'HTTPS protocol detected' if value == 0 else 'No SSL/HTTPS detected'
        }

    def _check_domain_registration(self, domain):
        """Feature 9: Check domain registration length"""
        value = -1 if any(domain.endswith(tld) for tld in self.suspicious_tlds) else 0
        
        return {
            'name': self.features['DOMAIN_REGISTRATION']['name'],
            'weight': self.features['DOMAIN_REGISTRATION']['weight'],
            'value': value,
            'description': 'Suspicious TLD detected' if value == -1 else 'Standard TLD used'
        }

    def _check_favicon_domain(self, url, domain):
        """Feature 10: Check favicon domain match"""
        try:
            html_content = self._get_html_content(url)
            if html_content:
                soup = BeautifulSoup(html_content, 'html.parser')
                favicon_links = soup.find_all('link', rel=lambda x: x and 'icon' in x.lower())
                
                for link in favicon_links:
                    href = link.get('href', '')
                    if href.startswith('http') and domain not in href:
                        return {
                            'name': self.features['FAVICON_DOMAIN']['name'],
                            'weight': self.features['FAVICON_DOMAIN']['weight'],
                            'value': 1,
                            'description': 'Favicon loaded from external domain'
                        }
        except:
            pass
            
        return {
            'name': self.features['FAVICON_DOMAIN']['name'],
            'weight': self.features['FAVICON_DOMAIN']['weight'],
            'value': 0,
            'description': 'Favicon matches domain'
        }

    def _check_non_standard_port(self, port):
        """Feature 11: Check for non-standard ports"""
        standard_ports = [None, 80, 443]
        value = 1 if port not in standard_ports else 0
        
        return {
            'name': self.features['NON_STANDARD_PORT']['name'],
            'weight': self.features['NON_STANDARD_PORT']['weight'],
            'value': value,
            'description': f'Non-standard port detected: {port}' if value == 1 else 'Standard port used'
        }

    def _check_https_in_domain(self, hostname):
        """Feature 12: Check for HTTPS in domain name"""
        value = -1 if 'https' in hostname.lower() else 0
        
        return {
            'name': self.features['HTTPS_IN_DOMAIN']['name'],
            'weight': self.features['HTTPS_IN_DOMAIN']['weight'],
            'value': value,
            'description': 'HTTPS found in domain name (suspicious)' if value == -1 else 'No HTTPS in domain name'
        }

    def _check_request_url(self, html_content, domain):
        """Feature 13: Check external request URLs"""
        if not html_content:
            return self._create_feature_result('REQUEST_URL', 0, 'Unable to analyze HTML content')
            
        try:
            soup = BeautifulSoup(html_content, 'html.parser')
            external_resources = 0
            total_resources = 0
            
            # Check images, scripts, stylesheets
            for tag in soup.find_all(['img', 'script', 'link']):
                src = tag.get('src') or tag.get('href')
                if src and src.startswith('http'):
                    total_resources += 1
                    if domain not in src:
                        external_resources += 1
            
            if total_resources == 0:
                value = 0
            else:
                external_ratio = external_resources / total_resources
                if external_ratio > 0.6:
                    value = -1
                elif external_ratio > 0.3:
                    value = 1
                else:
                    value = 0
                    
            return self._create_feature_result('REQUEST_URL', value, 
                f'{external_resources}/{total_resources} external resources')
        except:
            return self._create_feature_result('REQUEST_URL', 0, 'Unable to analyze external resources')

    def _check_anchor_tags(self, html_content, domain):
        """Feature 14: Check external anchor tags"""
        if not html_content:
            return self._create_feature_result('ANCHOR_TAGS', 0, 'Unable to analyze HTML content')
            
        try:
            soup = BeautifulSoup(html_content, 'html.parser')
            external_links = 0
            total_links = 0
            
            for link in soup.find_all('a', href=True):
                href = link['href']
                if href.startswith('http'):
                    total_links += 1
                    if domain not in href:
                        external_links += 1
            
            if total_links == 0:
                value = 0
            else:
                external_ratio = external_links / total_links
                if external_ratio > 0.5:
                    value = -1
                elif external_ratio > 0.2:
                    value = 1
                else:
                    value = 0
                    
            return self._create_feature_result('ANCHOR_TAGS', value, 
                f'{external_links}/{total_links} external links')
        except:
            return self._create_feature_result('ANCHOR_TAGS', 0, 'Unable to analyze anchor tags')

    def _check_links_in_meta(self, html_content, domain):
        """Feature 15: Check links in meta/script/link tags"""
        if not html_content:
            return self._create_feature_result('LINKS_IN_META', 0, 'Unable to analyze HTML content')
            
        try:
            soup = BeautifulSoup(html_content, 'html.parser')
            external_meta_links = 0
            total_meta_links = 0
            
            for tag in soup.find_all(['meta', 'script', 'link']):
                for attr in ['content', 'src', 'href']:
                    value_attr = tag.get(attr, '')
                    if value_attr and value_attr.startswith('http'):
                        total_meta_links += 1
                        if domain not in value_attr:
                            external_meta_links += 1
            
            if total_meta_links == 0:
                value = 0
            else:
                external_ratio = external_meta_links / total_meta_links
                value = -1 if external_ratio > 0.7 else (1 if external_ratio > 0.3 else 0)
                
            return self._create_feature_result('LINKS_IN_META', value, 
                f'{external_meta_links}/{total_meta_links} external meta links')
        except:
            return self._create_feature_result('LINKS_IN_META', 0, 'Unable to analyze meta links')

    def _check_server_form_handler(self, html_content, domain):
        """Feature 16: Check server form handler"""
        if not html_content:
            return self._create_feature_result('SERVER_FORM_HANDLER', 0, 'Unable to analyze HTML content')
            
        try:
            soup = BeautifulSoup(html_content, 'html.parser')
            suspicious_forms = 0
            
            for form in soup.find_all('form'):
                action = form.get('action', '')
                if action:
                    if action.startswith('http') and domain not in action:
                        suspicious_forms += 1
                    elif action in ['', '#', 'javascript:void(0)']:
                        suspicious_forms += 1
            
            value = -1 if suspicious_forms > 0 else 0
            return self._create_feature_result('SERVER_FORM_HANDLER', value, 
                f'{suspicious_forms} suspicious form handlers found' if value == -1 else 'No suspicious form handlers')
        except:
            return self._create_feature_result('SERVER_FORM_HANDLER', 0, 'Unable to analyze form handlers')

    def _check_submitting_to_email(self, html_content):
        """Feature 17: Check submitting to email"""
        if not html_content:
            return self._create_feature_result('SUBMITTING_TO_EMAIL', 0, 'Unable to analyze HTML content')
            
        try:
            soup = BeautifulSoup(html_content, 'html.parser')
            
            for form in soup.find_all('form'):
                action = form.get('action', '').lower()
                if action.startswith('mailto:'):
                    return self._create_feature_result('SUBMITTING_TO_EMAIL', -1, 'Form submits to email address')
            
            return self._create_feature_result('SUBMITTING_TO_EMAIL', 0, 'No email submission detected')
        except:
            return self._create_feature_result('SUBMITTING_TO_EMAIL', 0, 'Unable to analyze email submission')

    def _check_iframe_usage(self, html_content):
        """Feature 18: Check iframe usage"""
        if not html_content:
            return self._create_feature_result('IFRAME_USAGE', 0, 'Unable to analyze HTML content')
            
        try:
            soup = BeautifulSoup(html_content, 'html.parser')
            iframes = soup.find_all('iframe')
            
            if len(iframes) > 3:
                value = -1
            elif len(iframes) > 1:
                value = 1
            else:
                value = 0
                
            return self._create_feature_result('IFRAME_USAGE', value, 
                f'{len(iframes)} iframe(s) detected')
        except:
            return self._create_feature_result('IFRAME_USAGE', 0, 'Unable to analyze iframes')

    def _check_status_bar_manipulation(self, html_content):
        """Feature 19: Check status bar manipulation"""
        if not html_content:
            return self._create_feature_result('STATUS_BAR_MANIPULATION', 0, 'Unable to analyze HTML content')
            
        try:
            # Look for JavaScript that manipulates status bar
            manipulation_patterns = [
                'window.status', 'onmouseover', 'onmouseout', 
                'status=', 'defaultStatus'
            ]
            
            html_lower = html_content.lower()
            for pattern in manipulation_patterns:
                if pattern.lower() in html_lower:
                    return self._create_feature_result('STATUS_BAR_MANIPULATION', 1, 'Status bar manipulation detected')
            
            return self._create_feature_result('STATUS_BAR_MANIPULATION', 0, 'No status bar manipulation')
        except:
            return self._create_feature_result('STATUS_BAR_MANIPULATION', 0, 'Unable to analyze status bar manipulation')

    def _check_domain_age(self, domain):
        """Feature 20: Check domain age"""
        try:
            domain_info = whois.whois(domain)
            if domain_info.creation_date:
                creation_date = domain_info.creation_date
                if isinstance(creation_date, list):
                    creation_date = creation_date[0]
                    
                age_days = (datetime.now() - creation_date).days
                
                if age_days < 30:
                    value = -1
                elif age_days < 180:
                    value = 1
                else:
                    value = 0
                    
                return self._create_feature_result('DOMAIN_AGE', value, 
                    f'Domain age: {age_days} days')
            else:
                return self._create_feature_result('DOMAIN_AGE', 1, 'Unable to determine domain age')
        except:
            return self._create_feature_result('DOMAIN_AGE', 1, 'Domain age information unavailable')

    def _check_dns_record(self, domain):
        """Feature 21: Check DNS record existence"""
        try:
            dns.resolver.resolve(domain, 'A')
            return self._create_feature_result('DNS_RECORD', 0, 'DNS record exists')
        except:
            return self._create_feature_result('DNS_RECORD', -1, 'No DNS record found')

    def _check_whois_expiration(self, domain):
        """Feature 22: Check WHOIS expiration"""
        try:
            domain_info = whois.whois(domain)
            if domain_info.expiration_date:
                expiration_date = domain_info.expiration_date
                if isinstance(expiration_date, list):
                    expiration_date = expiration_date[0]
                    
                days_until_expiry = (expiration_date - datetime.now()).days
                
                if days_until_expiry < 30:
                    value = -1
                elif days_until_expiry < 365:
                    value = 1
                else:
                    value = 0
                    
                return self._create_feature_result('WHOIS_EXPIRATION', value, 
                    f'Expires in {days_until_expiry} days')
            else:
                return self._create_feature_result('WHOIS_EXPIRATION', 1, 'Unable to determine expiration date')
        except:
            return self._create_feature_result('WHOIS_EXPIRATION', 1, 'WHOIS expiration information unavailable')

    def _check_whois_creation(self, domain):
        """Feature 23: Check WHOIS creation date"""
        try:
            domain_info = whois.whois(domain)
            if domain_info.creation_date:
                creation_date = domain_info.creation_date
                if isinstance(creation_date, list):
                    creation_date = creation_date[0]
                    
                age_days = (datetime.now() - creation_date).days
                
                if age_days < 30:
                    value = -1
                elif age_days < 180:
                    value = 1
                else:
                    value = 0
                    
                return self._create_feature_result('WHOIS_CREATION', value, 
                    f'Created {age_days} days ago')
            else:
                return self._create_feature_result('WHOIS_CREATION', 1, 'Unable to determine creation date')
        except:
            return self._create_feature_result('WHOIS_CREATION', 1, 'WHOIS creation information unavailable')

    def _check_external_form_action(self, html_content, domain):
        """Feature 24: Check external form action"""
        if not html_content:
            return self._create_feature_result('EXTERNAL_FORM_ACTION', 0, 'Unable to analyze HTML content')
            
        try:
            soup = BeautifulSoup(html_content, 'html.parser')
            
            for form in soup.find_all('form'):
                action = form.get('action', '')
                if action.startswith('http') and domain not in action:
                    return self._create_feature_result('EXTERNAL_FORM_ACTION', -1, 'Form submits to external domain')
            
            return self._create_feature_result('EXTERNAL_FORM_ACTION', 0, 'No external form actions')
        except:
            return self._create_feature_result('EXTERNAL_FORM_ACTION', 0, 'Unable to analyze form actions')

    def _get_html_content(self, url):
        """Get HTML content from URL"""
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
            response = requests.get(url, headers=headers, timeout=10, verify=False)
            return response.text
        except:
            return None

    def _create_feature_result(self, feature_key, value, description):
        """Helper to create feature result"""
        return {
            'name': self.features[feature_key]['name'],
            'weight': self.features[feature_key]['weight'],
            'value': value,
            'description': description
        }

    def _calculate_score(self, features):
        """Calculate overall phishing score"""
        weighted_score = sum(feature['value'] * feature['weight'] for feature in features)
        max_possible_score = sum(feature['weight'] for feature in features)
        
        normalized_score = (weighted_score / max_possible_score) * 100
        
        if normalized_score < -30:
            classification = 'Phishing'
            confidence = min(95, abs(normalized_score) + 50)
        elif normalized_score < -10:
            classification = 'Suspicious'
            confidence = min(85, abs(normalized_score) + 40)
        else:
            classification = 'Safe'
            confidence = min(90, 60 + abs(normalized_score))
        
        return {
            'score': normalized_score,
            'classification': classification,
            'confidence': confidence
        }

    def _generate_recommendations(self, features, classification):
        """Generate security recommendations"""
        recommendations = []
        
        if classification in ['Phishing', 'Suspicious']:
            recommendations.extend([
                '⚠️ Do not enter personal information on this website',
                '🔍 Verify the website URL carefully',
                '🛡️ Use official links from trusted sources'
            ])
            
            dangerous_features = [f for f in features if f['value'] == -1]
            if dangerous_features:
                recommendations.append(f'🚨 High-risk features detected: {len(dangerous_features)}')
        else:
            recommendations.extend([
                '✅ URL appears to be legitimate',
                '🔒 Always verify HTTPS before entering sensitive data',
                '🎯 Double-check URL spelling and domain'
            ])
        
        return recommendations